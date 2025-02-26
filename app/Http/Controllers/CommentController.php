<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Models\Comment;
use App\Models\Feature;
use Illuminate\Http\RedirectResponse;

class CommentController extends Controller
{
    public function store(CommentRequest $request, Feature $feature): RedirectResponse
    {
        $validatedData = $request->validated();

        $validatedData['feature_id'] = $feature->id;
        $validatedData['user_id'] = auth()->user()->id;
        Comment::create($validatedData);

        return to_route('feature.show', $feature);
    }

    public function destroy(Comment $comment): RedirectResponse
    {
        if ($comment->user_id !== auth()->user()->id) {
            abort(403);
        }
        $comment->delete();

        return back();
    }
}
