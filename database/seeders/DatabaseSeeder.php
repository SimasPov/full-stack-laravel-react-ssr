<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\PermissionType;
use App\Enums\UserRole;
use App\Models\Feature;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $userRole = Role::create(['name' => UserRole::User->value]);
        $commenterRole = Role::create(['name' => UserRole::Commenter->value]);
        $adminRole = Role::create(['name' => UserRole::Admin->value]);

        $manageFeaturesPermission = Permission::create(['name' => PermissionType::ManageFeature->value]);
        $manageCommentsPermission = Permission::create(['name' => PermissionType::ManageComments->value]);
        $manageUsersPermission = Permission::create(['name' => PermissionType::ManageUsers->value]);
        $UpvoteDownvotePermission = Permission::create(['name' => PermissionType::UpvoteDownvote->value]);

        $userRole->syncPermissions([$UpvoteDownvotePermission]);
        $commenterRole->syncPermissions([$UpvoteDownvotePermission, $manageCommentsPermission]);
        $adminRole->syncPermissions([$UpvoteDownvotePermission, $manageUsersPermission, $manageFeaturesPermission, $manageCommentsPermission]);

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@user.com',
        ])->assignRole(UserRole::User);
        User::factory()->create([
            'name' => 'Test Commenter',
            'email' => 'test@commenter.com',
        ])->assignRole(UserRole::Commenter);
        User::factory()->create([
            'name' => 'Test Admin',
            'email' => 'test@admin.com',
        ])->assignRole(UserRole::Admin);

        Feature::factory(100)->create();
    }
}
