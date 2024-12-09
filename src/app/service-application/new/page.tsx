import { NewServiceApplicationPage } from '@nsa/lib/components/composables/new-service-application/NewServiceApplicationPage';
import { NewServiceApplicationPageV2 } from '@nsa/lib/components/composables/new-service-application/NewServiceApplicationPageV2';

export default function NewServiceApplication() {
  return (
    <>
      <div className="w-[100vw] h-[100vh]">
        {/* <NewServiceApplicationPage /> */}
        <NewServiceApplicationPageV2 />
      </div>
    </>
  );
}
