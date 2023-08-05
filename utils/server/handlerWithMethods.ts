import { NextApiRequest, NextApiResponse } from "next";

export default function handlerWithMethods(methods: {
  [key: string]: {
    controller: (payload: any) => Promise<any>;
    auth?: boolean;
  };
}) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    if (method && typeof methods[method] === "function") {
      const { auth } = methods[method];
      if (auth) {
        // Check if user is authenticated
        // If not, return 401
      }
      const result = await methods[method].controller(req.body);
      handleResultResponse(result, res);
    } else {
      res.setHeader("Allow", Object.keys(methods));
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  };
}

const handleResultResponse = (result: any, res: NextApiResponse) => {
  if (result.success) {
    res.status(200).json(result);
  } else {
    console.log(result);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
