export async function handleAsyncOperation(asyncFunc, onSuccess, onError) {
  try {
    const result = await asyncFunc();
    onSuccess(result);
  } catch (err) {
    onError(err);
  }
}
