import { json, LoaderFunctionArgs } from '@remix-run/node';
import { api } from '~/api';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const cookie = request.headers.get('cookie');
  const response = await api.V1.getTemporaryVersion({
    headers: {
      cookie: cookie,
    },
  });

  return json({
    temporaryVersion: response.data.data?.promptVersion,
  });
};
