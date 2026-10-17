async (page) => {
  const firestorePattern = /firestore\.googleapis\.com/;
  await page.context().route(firestorePattern, (route) => route.abort());
  await page.goto('http://127.0.0.1:3000/gallery');
  await page.getByText('Не удалось загрузить галерею. Проверь подключение и повтори попытку.', { exact: true }).waitFor({ timeout: 16000 });
  if (await page.getByText('Публикаций пока нет. Можно поделиться своим примером кода.', { exact: true }).count()) throw new Error('Network failure was presented as an empty gallery');
  await page.context().unroute(firestorePattern);
  await page.getByRole('button', { name: 'Повторить загрузку', exact: true }).click();
  await page.getByRole('button', { name: /Открыть код:/ }).first().waitFor({ timeout: 20000 });
  return { count: 2, checks: ['Firestore timeout gives recoverable error instead of false empty state', 'Gallery read succeeds after explicit retry'] };
}
