<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Feature;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, Feature $feature): RedirectResponse
    {
        $data = $request->validate([
            'comment' => ['required'],
        ]);

        $data['feature_id'] = $feature->id;
        $data['user_id'] = auth()->user()->id;
        Comment::create($data);

        return to_route('feature.show', $feature);
    }

    public function destroy(Comment $comment): RedirectResponse
    {
        $comment->delete();

        return back();
    }
}
