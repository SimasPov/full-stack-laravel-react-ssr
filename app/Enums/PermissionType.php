<?php

declare(strict_types=1);

namespace App\Enums;

enum PermissionType: string
{
    case ManageFeature = 'manage_features';
    case ManageUsers = 'manage_users';
    case ManageComments = 'manage_comments';
    case UpvoteDownvote = 'upvote_downvote';
}
