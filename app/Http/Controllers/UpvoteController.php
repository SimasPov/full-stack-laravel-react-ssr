<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Feature;
use App\Models\Upvote;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class UpvoteController extends Controller
{
    public function store(Request $request, Feature $feature): RedirectResponse
    {
        $data = $request->validate([
            'upvote' => ['required', 'boolean'],
        ]);

        Upvote::updateOrCreate(
            ['feature_id' => $feature->id, 'user_id' => auth()->id()],
            ['upvote' => $data['upvote']]
        );

        return back();
    }

    public function destroy(Feature $feature): RedirectResponse
    {
        $feature->upvotes()->where('user_id', auth()->id())->delete();

        return back();
    }
}
