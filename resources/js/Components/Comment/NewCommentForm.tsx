import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextAreaInput from '@/Components/TextAreaInput';
import { Feature } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function NewCommentForm({ feature }: { feature: Feature }) {
    const { data, setData, post, errors, processing } = useForm({
        comment: '',
    });

    const createComment: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('comment.store', feature.id), {
            preserveScroll: true,
            onSuccess: () => setData('comment', ''),
        });
    };
    return (
        <form className="mb-4 rounded-lg bg-gray-50 py-2 dark:bg-gray-800" onSubmit={createComment}>
            <div className="flex items-center">
                <TextAreaInput
                    id="comment"
                    className="mr-3 mt-1 block w-full"
                    rows={1}
                    value={data.comment}
                    onChange={(e) => setData('comment', e.target.value)}
                    placeholder="Your comment goes here..."
                />
                <PrimaryButton disabled={processing}>Create</PrimaryButton>{' '}
            </div>
            <InputError className="mt-2" message={errors.comment} />
        </form>
    );
}
