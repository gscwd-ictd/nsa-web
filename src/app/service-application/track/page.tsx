import { TrackingResults } from '@nsa/lib/components/composables/application/TrackingResults';
import { ApplicationIdForm } from '@nsa/lib/components/composables/forms/ApplicationIdForm';

export default function TrackServiceApplication() {
  return (
    <>
      <div className="h-[100vh] flex flex-col overflow-auto">
        <div className="py-16 px-[10%] bg-gradient-to-tr from-blue-700 to-blue-500 grid sm:grid-cols-1 lg:grid-cols-2 w-full gap-4 ">
          <ApplicationIdForm />
        </div>

        <TrackingResults />
      </div>
    </>
  );
}
