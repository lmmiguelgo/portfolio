import { google } from "googleapis";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, date, time, message } = body;

    if (!name || !email || !date || !time) {
      return Response.json({ error: "Missing required fields." }, { status: 400 });
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    if (!clientId || !clientSecret || !refreshToken || !calendarId) {
      return Response.json(
        { error: "Calendar integration not configured." },
        { status: 503 }
      );
    }

    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
    oauth2Client.setCredentials({ refresh_token: refreshToken });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

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
          timeZone: "America/Los_Angeles",
        },
        end: {
          dateTime: endDateTime.toISOString(),
          timeZone: "America/Los_Angeles",
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
