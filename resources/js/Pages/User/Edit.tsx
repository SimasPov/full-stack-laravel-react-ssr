import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import Radio from '@/Components/Radio';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { User } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Create({ user, allRoles, roleLabels }: { user: User; allRoles: any; roleLabels: Record<string, string> }) {
    const { data, setData, patch, processing } = useForm({
        name: user.name,
        email: user.email,
        roles: user.roles,
    });

    const onRoleChange = (e) => {
        if (e.target.checked) {
            setData('roles', [e.target.value]);
        }
    };

    const updateFeature: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('user.update', user.id));
    };
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Edit User - {user.name}</h2>}
        >
            <Head title={'Edit: ' + user.name} />
            <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                <div className="flex gap-8 p-6 text-gray-900 dark:text-gray-100">
                    <form onSubmit={updateFeature} className="w-full space-y-6">
                        <div>
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput id="name" className="mt-1 block w-full" value={data.name} disabled />
                        </div>
                        <div>
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput id="email" className="mt-1 block w-full" value={data.email} disabled />
                        </div>
                        <div>
                            <InputLabel htmlFor="role" value="Role" />
                            {allRoles.map((role: any) => (
                                <label className="mb-1 flex items-center" key={role.id}>
                                    <Radio name="role" value={role.name} checked={data.roles.includes(role.name)} onChange={onRoleChange} />
                                    <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">{roleLabels[role.name]}</span>
                                </label>
                            ))}
                        </div>

                        <PrimaryButton disabled={processing}>Update</PrimaryButton>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
