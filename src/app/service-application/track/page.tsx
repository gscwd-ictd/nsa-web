import { ApplicationIdForm } from '@nsa/lib/components/composables/forms/ApplicationIdForm';
import { Spinner } from '@nsa/lib/components/ui/Spinner';
import { Suspense } from 'react';

export default function TrackServiceApplication() {
  return (
    <>
      <div className="h-[100vh] flex flex-col overflow-auto">
        <Suspense
          fallback={
            <div className="w-full h-screen flex justify-center">
              <Spinner />
            </div>
          }
        >
          <ApplicationIdForm />
        </Suspense>
      </div>
    </>
  );
}
