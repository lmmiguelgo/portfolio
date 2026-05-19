import { google } from "googleapis";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, date, time, message } = body;

    if (!name || !email || !date || !time) {
      return Response.json({ error: "Missing required fields." }, { status: 400 });
    }

    const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    if (!credentials || !calendarId) {
      return Response.json(
        { error: "Calendar integration not configured." },
        { status: 503 }
      );
    }

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(credentials),
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });

    const calendar = google.calendar({ version: "v3", auth });

    // Build start/end datetime (1 hour duration)
    const startDateTime = new Date(`${date}T${time}:00`);
    const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);

    const event = await calendar.events.insert({
      calendarId,
      sendUpdates: "all",
      requestBody: {
        summary: `Interview — ${name}`,
        description: message
          ? `Message from ${name}: ${message}`
          : `Interview request from ${name} (${email})`,
        start: {
          dateTime: startDateTime.toISOString(),
          timeZone: "America/Puerto_Rico",
        },
        end: {
          dateTime: endDateTime.toISOString(),
          timeZone: "America/Puerto_Rico",
        },
        attendees: [{ email, displayName: name }],
        conferenceData: {
          createRequest: {
            requestId: `${Date.now()}`,
            conferenceSolutionKey: { type: "hangoutsMeet" },
          },
        },
      },
      conferenceDataVersion: 1,
    });

    return Response.json({ success: true, eventId: event.data.id });
  } catch (err) {
    console.error("Calendar API error:", err);
    return Response.json({ error: "Failed to create event." }, { status: 500 });
  }
}
