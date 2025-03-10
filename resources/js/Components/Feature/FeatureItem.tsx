import FeatureActionDropdown from '@/Components/Feature/FeatureActionDropdown';
import FeatureUpvoteDownvote from '@/Components/Feature/FeatureUpvoteDownvote';
import { can } from '@/helpers';
import { Feature } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';

dayjs.extend(relativeTime);

export default function FeatureItem({ feature }: { feature: Feature }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const user = usePage().props.auth.user;
    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="flex gap-8 p-6 text-gray-900 dark:text-gray-100">
                <FeatureUpvoteDownvote feature={feature} />
                <div className="flex-1">
                    <h2 className="mb-2 text-2xl">
                        <Link href={route('feature.show', feature.id)} className="hover:text-indigo-400">
                            {feature.name}
                        </Link>
                    </h2>
                    {(feature.description?.length > 200 && (
                        <>
                            <p>{isExpanded ? feature.description : `${feature.description.slice(0, 200)}`}...</p>
                            <button onClick={toggleReadMore} className="text-amber-500 hover:underline">
                                {isExpanded ? 'Read Less' : 'Read More'}
                            </button>
                        </>
                    )) || <p>{feature.description}</p>}
                    <div className="mt-4 flex justify-between">
                        <Link
                            href={route('feature.show', feature.id)}
                            className="mb-2 me-2 inline-flex gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                        >
                            Comments
                        </Link>
                        <p title={feature.created_at} className="text-xs text-gray-500">
                            {dayjs(feature.created_at).fromNow()}
                        </p>
                    </div>
                </div>
                {can(user, 'manage_features') && (
                    <div>
                        <FeatureActionDropdown feature={feature} />
                    </div>
                )}
            </div>
        </div>
    );
}
