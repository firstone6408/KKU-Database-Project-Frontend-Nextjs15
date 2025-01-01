/** @format */

export function renderSuccess<T>(params: { message: string; data?: T })
{
  const { message, data } = params;
  return { ok: true, message: message };
}

export function renderFail(params: { error: unknown })
{
  const { error } = params;
  // console.error(error)
  return {
    ok: false,
    message: error instanceof Error ? error.message : String(error),
  };
}
