import CommentItem from '@/Components/Comment/CommentItem';
import NewCommentForm from '@/Components/Comment/NewCommentForm';
import FeatureUpvoteDownvote from '@/Components/Feature/FeatureUpvoteDownvote';
import { can } from '@/helpers';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Comment, Feature } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function Show({ feature }: { feature: Feature }) {
    const user = usePage().props.auth.user;
    return (
        <AuthenticatedLayout>
            <Head title={'Feature: ' + feature.name} />
            <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                <div className="flex gap-8 p-6 text-gray-900 dark:text-gray-100">
                    <FeatureUpvoteDownvote feature={feature} />
                    <div className="flex-1">
                        <h2 className="mb-2 text-2xl">{feature.name}</h2>
                        <p>{feature.description}</p>
                        <p title={feature.created_at} className="mt-2 text-xs text-gray-500">
                            {dayjs(feature.created_at).fromNow()}
                        </p>
                        <div className="mt-6">
                            {(!can(user, 'manage_comments') && (
                                <div className="mb-2 text-center text-gray-700">
                                    <p>You do not have permission to comment</p>
                                </div>
                            )) || <NewCommentForm feature={feature} />}
                            {feature.comments.map((comment: Comment) => (
                                <CommentItem comment={comment} key={comment.id} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
