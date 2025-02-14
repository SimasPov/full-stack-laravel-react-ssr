import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextAreaInput from '@/Components/TextAreaInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Create() {
    const { data, setData, errors, post, processing } = useForm({
        name: '',
        description: '',
    });

    const createFeature: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('feature.store'));
    };
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Create New Feature</h2>}>
            <Head title="Create New Feature" />
            <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                <div className="flex gap-8 p-6 text-gray-900 dark:text-gray-100">
                    <form onSubmit={createFeature} className="w-full space-y-6">
                        <div>
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                isFocused
                                autoComplete="name"
                            />

                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div>
                            <InputLabel htmlFor="description" value="Description" />

                            <TextAreaInput
                                id="description"
                                className="mt-1 block w-full"
                                rows={10}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                            />

                            <InputError className="mt-2" message={errors.description} />
                        </div>

                        <PrimaryButton disabled={processing}>Create</PrimaryButton>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
