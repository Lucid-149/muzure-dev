import { RecordModel as BaseModel } from "pocketbase";
import { SVGProps } from "react";
type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

type Rate= BaseModel &{
  Currency: string;
  rate_to_usd:number;
}
// database
type User = BaseModel & {
  username: string;
  verified: boolean;
  emailVisibility: boolean;
  email: string;
  name: string;
  avatar: string;
  type: string;
};
type media ={
  name:string;
  image:string;
}
type Accommodation = BaseModel & {
  Name: string;
  details: string;
  Image: string;
  media: media[];
};

type Car = BaseModel & {
  Name: string;
  Image: string;
  Details: string;
  Lease: CarLeaseOption[];
  Number_of_passengers: number;
  Price_per_day: number;
};

type Tour = BaseModel & {
  Name: string;
  Description: string;
  Image: string;
  Details: TrustedHTML;
  Type: TourType[];
  Duration_in_days:number
  Max_Travellers: number;
  Best_Season: string;
  Countries: string[];
  Tour_uuid:string;
  published:boolean
};

type TourPrices = BaseModel & {
  tour: string;
  Price_per_adult: number;
  Price_per_child: number;
  Accommodation_price_per_person_sharing: number;
  Transport_price: number;
  Meal_price_per_person: number;
};

type Booking = BaseModel & {
  Agent: string;
  Client_name: string;
  Client_phone_number: string;
  Client_email: string;
  Booking_details: string; //
  Status: BookingStatus;
};
type Blog = BaseModel &{
  title: string;
  subtitle:string;
  body:string;
  image:string;
  comments: string[];
}
type Room = BaseModel & {
  Accommodation: string;
  Name: string;
  Description: string;
  Rates: string;
  Number_of_guests: number;
  type: RoomType[];
};

type Itinerary = BaseModel & {
  Tour: string;
  Description: string;
  Total_Distance_KM: number;
  Stops: string[];
  Days: any;
};

type Destination = BaseModel & {
  Name: string;
  Image: string;
  Description: string;
  Details: string;
  Geo_Location: string;
  Season: string;
  Country: string;
};

type Country = BaseModel & {
  Name: string;
  Description: string;
  Image: string;
  Currency: string;
  Flag: string;
};

type Chat = BaseModel & {
  email: string;
  Agent: string;
  messages: string; // Assuming it's a JSON string, adjust as needed
};

type EntryPrices = BaseModel & {
  Destination: string; // Assuming this is a related record ID, adjust as needed
  prices: string; // Assuming it's a JSON string, adjust as needed
};

type TourType =
  | "PUBLIC"
  | "PRIVATE"
  | "CAMPING"
  | "TREKKING"
  | "HIKING"
  | "BIKING"
  | "MOTORBIKING"
  | "DRIVING"
  | "FISHING"
  | "HUNTING"
  | "BIRDWATCHING"
  | "PHOTOGRAPHY"
  | "SAFARI"
  | "BEACH";

type BookingStatus =
  | "PENDING"
  | "DRAFT"
  | "PROCESSING"
  | "CONFIRMED"
  | "CANCELLED"
  | "REFUNDED";

type CarLeaseOption = "CAR" | "CAR AND DRIVER" | "ALL INCLUSIVE";

type RoomType =
  | "SINGLE"
  | "DOUBLE"
  | "POOL SIDE"
  | "GARDEN VIEW"
  | "OCEAN VIEW"
  | "NATURE"
  | "CAMP"
  | "TENT"
  | "CABIN"
  | "HOTEL"
  | "SUITE"
  | "PENTHOUSE"
  | "APARTMENT"
  | "LODGE"
  | "TRIPLE"
  | "DORM";
