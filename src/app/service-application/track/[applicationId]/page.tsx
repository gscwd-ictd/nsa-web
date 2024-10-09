import { ApplicationSuccess } from '@nsa/lib/components/composables/application/ApplicationSuccess';

export default function TrackApplicationId() {
  return (
    <>
      <div className="w-[100vw] h-[100vh] overflow-y-auto">
        <ApplicationSuccess />
      </div>
    </>
  );
}
