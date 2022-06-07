import type { NextApiRequest } from 'next'
import { Message } from '../../types/message_type';
import { NextApiResponseServerIO } from '../../types/socket_type';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {

  if (req.method === "POST") {
    // get message
    const body: Message = JSON.parse(req.body);

    // dispatch to channel "message"
    res?.socket?.server?.io?.emit("message", body);

    // return message
    res.status(201).json(body.text);
  }

}
