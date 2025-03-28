"use client";
// Uploader.tsx

import { FormEvent, useState } from "react";

interface UploaderProps {
    reloadParent: () => void;
}

export default function Uploader({ reloadParent }: UploaderProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        try {
            const formData = new FormData(event.currentTarget);
            const response = await fetch("/api/py/upload", {
                method: "POST",
                body: formData,
            });
    
            const data = await response.json();
            console.log(data);

            reloadParent();
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-6 w-full max-w-lg items-center justify-center font-mono text-sm">
            <form
                onSubmit={onSubmit}
                className="bg-gray-800 p-6 rounded-lg shadow-md"
            >
                <h2 className="text-lg font-bold text-white mb-4">Upload File</h2>
                <div className="mb-4">
                    <label
                        htmlFor="file"
                        className="block text-sm font-medium text-gray-300 mb-2"
                    >
                        Choose a file
                    </label>
                    <input
                        type="file"
                        name="file"
                        id="file"
                        className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-gray-300 hover:file:bg-gray-600"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    {isLoading ? 'Loading...' : 'Upload'}
                </button>
            </form>
        </div>
    );
}