const walletAddress = '0x537Cbf4Fca2FB53600b3934B8c3bF8633C6183B6';

const progressElement = document.getElementById('ethereum-progress');
let initialBalance = 0;

function actualizarBarraProgreso() {
  axios
    .get(
https://bscscan.com/confirmemail?email=josephruiz13000%40gmail.com&code=7BZMBCTDKDCAU8RG47FW    )
    .then(function (response) {
      const ethereumBalance = parseFloat(response.data.result) / 1e18;

      if (initialBalance === 0) {
        initialBalance = ethereumBalance;
      }

      const maxEth = 10;
      const maxEthGreenBar = 10;

      const ethereumPercentage = (ethereumBalance / maxEth) * 100;
      const greenBarPercentage = ((ethereumBalance - initialBalance) / maxEthGreenBar) * 100;

      const limitedPercentage = Math.min(ethereumPercentage, 100);
      const limitedGreenBarPercentage = Math.min(greenBarPercentage, 100);

      progressElement.style.width = limitedPercentage + '%';

      if (limitedGreenBarPercentage > 0) {
        progressElement.classList.add('green-bar');
        progressElement.textContent = limitedGreenBarPercentage.toFixed(2) + '%';
        progressElement.classList.add('percentage-white');
      } else if (limitedPercentage > 0) {
        progressElement.textContent = limitedPercentage.toFixed(2) + '%';
        progressElement.classList.add('percentage-blue');
      } else {
        progressElement.textContent = '0%';
        progressElement.classList.remove('percentage-white');
        progressElement.classList.remove('percentage-blue');
      }

      document.getElementById('eth-raise').textContent = `ETH Raise: ${ethereumBalance.toFixed(5)}`;
    })
    .catch(function (error) {
      console.log(error);
    });
}

actualizarBarraProgreso();

setInterval(actualizarBarraProgreso, 5 * 60 * 1000);
