import FeatureItem from '@/Components/Feature/FeatureItem';
import { can } from '@/helpers';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Feature } from '@/types';
import { Head, Link, usePage, WhenVisible } from '@inertiajs/react';
import { useMemo } from 'react';

export default function Index({ features, pagination }: { features: Feature[]; pagination: Record<string, any> }) {
    const reachedEnd = useMemo(() => {
        return pagination.current_page >= pagination.last_page;
    }, [pagination.current_page, pagination.last_page]);
    const user = usePage().props.auth.user;
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Features</h2>}>
            <Head title="Features" />
            {can(user, 'manage_features') && (
                <div className="mb-8">
                    <Link
                        href={route('feature.create')}
                        className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300"
                    >
                        New feature
                    </Link>
                </div>
            )}
            {features.map((feature: Feature) => (
                <FeatureItem feature={feature} key={feature.id} />
            ))}

            <WhenVisible
                always={!reachedEnd}
                fallback={<div>Loading...</div>}
                buffer={500}
                params={{
                    data: { page: pagination.current_page + 1 },
                    preserveUrl: true,
                    only: ['features', 'pagination'],
                }}
            ></WhenVisible>
        </AuthenticatedLayout>
    );
}
