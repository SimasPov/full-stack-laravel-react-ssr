import FeatureUpvoteDownvote from '@/Components/Features/FeatureUpvoteDownvote';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Feature } from '@/types';
import { Head } from '@inertiajs/react';

export default function Show({ feature }: { feature: Feature }) {
    return (
        <AuthenticatedLayout>
            <Head title={'Feature: ' + feature.name} />
            <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                <div className="flex gap-8 p-6 text-gray-900 dark:text-gray-100">
                    <FeatureUpvoteDownvote feature={feature} />
                    <div className="flex-1">
                        <h2 className="mb-2 text-2xl">{feature.name}</h2>
                        <p>{feature.description}</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
