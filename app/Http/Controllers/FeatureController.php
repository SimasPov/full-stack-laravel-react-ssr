<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\FeatureRequest;
use App\Http\Resources\FeatureEditResource;
use App\Http\Resources\FeatureListResource;
use App\Http\Resources\FeatureResource;
use App\Models\Feature;
use App\Models\Upvote;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class FeatureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $paginated = Feature::with('user')
            ->withCount(['upvotes as upvote_count' => function ($query): void {
                $query->select(DB::raw('SUM(CASE WHEN upvote = 1 THEN 1 ELSE -1 END)'));
            }])
            ->withExists([
                'upvotes as user_has_upvoted' => function ($query): void {
                    $query->where('user_id', '=', auth()->id())->where('upvote', '=', 1);
                },
                'upvotes as user_has_downvoted' => function ($query): void {
                    $query->where('user_id', '=', auth()->id())->where('upvote', '=', 0);
                },
            ])
            ->latest()
            ->paginate(10);

        return Inertia::render('Feature/Index', [
            'features' => Inertia::merge(FeatureListResource::collection($paginated)->collection->toArray()),
            'pagination' => Arr::except($paginated->toArray(), 'data'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Feature/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FeatureRequest $request): RedirectResponse
    {
        $validatedData = $request->validated();

        $validatedData['user_id'] = auth()->id();

        Feature::create($validatedData);

        return to_route('feature.index')->with('success', 'Feature created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Feature $feature): Response
    {
        $feature->upvote_count = Upvote::where('feature_id', $feature->id)
            ->sum(DB::raw('CASE WHEN upvote = 1 THEN 1 ELSE -1 END'));

        $feature->user_has_upvoted = Upvote::where('feature_id', '=', $feature->id)
            ->where('user_id', '=', auth()->id())
            ->where('upvote', '=', 1)
            ->exists();
        $feature->user_has_downvoted = Upvote::where('feature_id', '=', $feature->id)
            ->where('user_id', '=', auth()->id())
            ->where('upvote', '=', 0)
            ->exists();
        $feature->load('comments.user');

        return Inertia::render('Feature/Show', ['feature' => new FeatureResource($feature)]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Feature $feature): Response
    {
        return Inertia::render('Feature/Edit', ['feature' => new FeatureEditResource($feature)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FeatureRequest $request, Feature $feature): RedirectResponse
    {
        $validatedData = $request->validated();

        $feature->update($validatedData);

        return to_route('feature.index')->with('success', 'Feature updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feature $feature): RedirectResponse
    {
        $feature->delete();

        return to_route('feature.index')->with('success', 'Feature deleted successfully.');
    }
}
