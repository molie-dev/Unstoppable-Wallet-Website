# Комиссии за транзакции

Каждая транзакция в Ethereum требует комиссии, оплачиваемой в ETH, которая идет валидаторам, поддерживающим сеть. Вот как работают эти комиссии:

- **Gas и Gas Limit:** Ethereum использует систему под названием "gas" для измерения усилий, необходимых для транзакции. Простые транзакции, как отправка ETH, требуют меньше gas, в то время как сложные транзакции с участием smart contracts требуют больше. **Gas limit** — это максимальный gas, который пользователь готов заплатить за транзакцию.

- **Цена Gas:** Цена gas — это сколько ETH вы готовы заплатить за единицу gas. Когда сеть загружена, цены на gas растут, так как пользователи конкурируют за более быструю обработку своих транзакций. Большинство кошельков оценивают цены на gas за вас, но вы можете регулировать их для скорости. Например, в периоды высокого спроса комиссии могут достигать $100 и более за такие транзакции, как обмен токенов.

- **Роль кошельков в оценке комиссий:** Кошельки автоматически предлагают цену gas и лимит на основе активности сети, упрощая процесс. Пользователи часто могут регулировать комиссии вручную, если хотят ускорить или замедлить транзакцию. Фактически, большинство кошельков даже не показывают эти понятия пользователю и просто отображают приблизительную сумму в долларах США, которую пользователь должен заплатить за транзакцию. Пользователь просто перемещает ползунок, указывающий сумму, которую он готов заплатить в долларах США, а все остальное обрабатывается кошельком под капотом. Увеличение комиссии за транзакцию по сути увеличивает цену gas, которую пользователь готов заплатить.

В 2021 году обновление Ethereum EIP-1559 ввело механизм **сжигания**, при котором часть комиссий за транзакции навсегда удаляется из обращения. Это помогает сократить предложение ETH с течением времени, особенно в периоды высокой активности сети, когда много людей совершают транзакции. (EIP, или Ethereum Improvement Proposals, — это система, с помощью которой в Ethereum добавляются обновления и новые функции.)