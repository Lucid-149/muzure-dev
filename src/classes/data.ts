import { render } from "@react-email/render";
import { cookies } from "next/headers";
import PocketBase, {
  ListResult,
  RecordAuthResponse as AuthResult,
  RecordModel,
} from "pocketbase";

// create email
import nodemailer from "nodemailer";
import { ReactElement, ReactNode } from "react";
import { Booking } from "@/types";

export class EmailSender {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "mail.muzuretravel.com",
      port: 465,
      secure: true,
      auth: {
        user: "noreply@muzuretravel.com",
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  public async sendEmail(
    recipient: string,
    subject: string,
    mail: ReactElement
  ): Promise<void> {
    const email = render(mail);
    const mailOptions: nodemailer.SendMailOptions = {
      from: "noreply@muzuretravel.com",
      to: recipient,
      subject: subject,
      html: email,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`Email sent: ${info.response}`);
    } catch (error) {
      console.error(`Error sending email: ${error}`);
    }
  }
}

interface PocketBaseOperation<T> {
  execute(): Promise<T>;
}

export class GetData<T> implements PocketBaseOperation<ListResult<T>> {
  constructor(
    private pb: PocketBase,
    private collectionName:
      | "Users"
      | "Booking"
      | "Chat"
      | "Country"
      | "Destinations"
      | "Entry_price"
      | "Itenerary"
      | "Room"
      | "Accommodation"
      | "Cars"
      | "Tour"
      | "Tour_prices",
    private page: number = 1,
    private perPage: number = 30,
    private filter: string | undefined = undefined,
    private expand: string | undefined = undefined
  ) {}

  async execute(): Promise<ListResult<T>> {
    try {
      const result = await this.pb
        .collection(this.collectionName)
        .getList<T>(this.page, this.perPage, {
          filter: this.filter,
          requestKey: null,
          sort: '+created',
          expand: this.expand
        });
      return result;
    } catch (error) {
      // Handle errors here
      console.error("Error executing operation:", error);
      throw error;
    }
  }
}

export class PocketBaseAuthOperation
  implements PocketBaseOperation<AuthResult>
{
  constructor(
    private pb: PocketBase,
    private usernameOrEmail: string,
    private password: string
  ) {}

  async execute(): Promise<AuthResult> {
    try {
      const result = await this.pb
        .collection("Users")
        .authWithPassword(this.usernameOrEmail, this.password);
      return result;
    } catch (error) {
      // Handle errors here
      console.error("Error executing authentication operation:", error);
      throw error;
    }
  }
}

// Create Booking
export class CreateBookingOperation<T extends FormData | Booking>
  implements PocketBaseOperation<T>
{
  constructor(private pb: PocketBase, private bookingDetails: T) {}

  async execute(): Promise<T> {
    try {
      const result = await this.pb
        .collection("Booking")
        .create(this.bookingDetails);
      return result as unknown as T;
    } catch (error) {
      console.error("Error creating booking:", error);
      throw error;
    }
  }

  // Save booking in cookies
 
}

// Find Booking

export class FindBookingOperation<T> implements PocketBaseOperation<T> {
  constructor(
    private pb: PocketBase,
    private bookingId: string // replace with the actual type of your booking ID
  ) {}

  async execute(): Promise<T> {
    try {
      const result = await this.pb.collection("Booking").getOne(this.bookingId);
      return result as T;
    } catch (error) {
      console.error("Error finding booking:", error);
      throw error;
    }
  }
}

// Cancel Booking
export class CancelBookingOperation<T> implements PocketBaseOperation<T> {
  constructor(
    private pb: PocketBase,
    private bookingId: string // replace with the actual type of your booking ID
  ) {}

  async execute(): Promise<T> {
    try {
      const result = await this.pb.collection("Booking").delete(this.bookingId);
      return result as T;
    } catch (error) {
      console.error("Error canceling booking:", error);
      throw error;
    }
  }
}

// Create Chat
export class CreateChatRoomOperation<T extends FormData>
  implements PocketBaseOperation<T>
{
  constructor(private pb: PocketBase, private chatRoomDetails: T) {}

  async execute(): Promise<T> {
    try {
      const result = await this.pb
        .collection("Chat")
        .create(this.chatRoomDetails);
      return result as unknown as T;
    } catch (error) {
      console.error("Error creating chat room:", error);
      throw error;
    }
  }
}

// paystack API

export class PaystackAPI {
  private baseUrl: string;
  private secretKey: string;

  constructor(secretKey: string) {
    this.baseUrl = "https://api.paystack.co";
    this.secretKey = secretKey;
  }

  private async fetchData(
    url: string,
    method: string,
    body?: any
  ): Promise<any> {
    const headers = new Headers({
      Authorization: `Bearer ${this.secretKey}`,
      "Content-Type": "application/json",
    });

    const options: RequestInit = {
      method,
      headers,
      mode: "cors",
      cache: "default",
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${this.baseUrl}${url}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async getSubscription(idOrCode: string): Promise<any> {
    return this.fetchData(`/subscription/${idOrCode}`, "GET");
  }

  async initializeTransaction(transactionData: {
    amount: string;
    email: string;
    currency?: string;
    reference?: string;
    callback_url?: string;
    plan?: string;
    invoice_limit?: number;
    metadata?: string;
    channels?: string[];
    split_code?: string;
    subaccount?: string;
    transaction_charge?: number;
    bearer?: string;
  }): Promise<any> {
    return this.fetchData("/transaction/initialize", "POST", transactionData);
  }
}
