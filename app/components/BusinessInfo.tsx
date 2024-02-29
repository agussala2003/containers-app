import { Business } from "@/utils/models/Business";

export default function BusinessInfo({ business }: { business: Business | null}) {

  return (
    <>
      {business && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Bienvenido!</h2>
          <p>{business.business_name}</p>
          <p>{business.street_name} {business.phone_number}</p>
          <p>{business.phone_number}</p>
        </div>
      )}
    </>
  );
}