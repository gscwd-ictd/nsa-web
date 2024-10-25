import { ApplicationDetails } from '@nsa/lib/components/composables/application/ApplicationDetails';

export default function TrackApplicationId() {
  return (
    <>
      <div className="w-[100vw] h-[100vh] overflow-y-auto">
        <ApplicationDetails />
      </div>
    </>
  );
}
