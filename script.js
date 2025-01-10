// Inisiasi awal sumber emisi
let totalEmisi = {
    TtListrik: 24338.46,
    TtAC: 1634.50,
    TtTransportasi: 1252.87,
    TtSemen: 6779.05,
    TtLPG: 202.43,
    TtSampah: 93.83,
    TtKertas: 62.15,
}

document.getElementById("visibility_langkah_mitigasi").style.display = "none";
document.getElementById("visibility_kredit_mitigasi").style.display = "none";

let jumlahTotalEmTahun = totalEmisi.TtListrik + totalEmisi.TtAC + totalEmisi.TtTransportasi  + 
  totalEmisi.TtSemen + totalEmisi.TtLPG + totalEmisi.TtSampah + totalEmisi.TtKertas

//console.log(jumlahTotalEmTahun)

//perhitungan Nilai Scope
let hitungScope1 = totalEmisi.TtTransportasi + totalEmisi.TtLPG + totalEmisi.TtAC
let hitungScope2 = totalEmisi.TtListrik
let hitungScope3 = totalEmisi.TtSampah + totalEmisi.TtKertas + totalEmisi.TtSemen

//perhitungan Nilai Persen Scope
let persenScope1 = (hitungScope1/jumlahTotalEmTahun)*100
let persenScope2 = (hitungScope2/jumlahTotalEmTahun)*100
let persenScope3 = (hitungScope3/jumlahTotalEmTahun)*100

let allScope = {
  scope1: hitungScope1,
  scope2: hitungScope2,
  scope3: hitungScope3,
}

let persenScope = {
  persenScope1 : persenScope1,
  persenScope2 : persenScope2,
  persenScope3 : persenScope3,
}

let jumlahCarbonCapture = 52133-jumlahTotalEmTahun

let potensiCarbonOffset = jumlahCarbonCapture * (5 * 16171.30)

// Selesai

Chart.defaults.font.size = 14

// Ambil referensi ke elemen canvas(Inisiasi HTML Grafik)
const scope1CTX = document.getElementById('scope_1').getContext('2d');
const scope2CTX = document.getElementById('scope_2').getContext('2d');
const scope3CTX = document.getElementById('scope_3').getContext('2d');

const chartCtx = document.getElementById('sumber_emisi').getContext('2d');
const serapHUI = document.getElementById('serapan_hutan').getContext('2d');
const carbCapt = document.getElementById('carbon_capture').getContext('2d');

const mikroAlga = document.getElementById('mikro_alga').getContext('2d')

//Inisiasi elemen Text
let txtPersenScope1 = document.getElementById('persentase_scope_1')
let txtPersenScope2 = document.getElementById('persentase_scope_2')
let txtPersenScope3 = document.getElementById('persentase_scope_3')

let txthasilScope1 = document.getElementById('hasil_scope_1')
let txthasilScope2 = document.getElementById('hasil_scope_2')
let txthasilScope3 = document.getElementById('hasil_scope_3')

let txtHasilTotEmisi = document.getElementById('hasil_total_emisi')

let txtRpHasilCarbonOff = document.getElementById('hasil_carbon_offset')
let txtRpHasilCreditAlga = document.getElementById('hasil_kredit_alga')
let txtRpKarbonKredit = document.getElementById('rp_kredit_mitigasi')

//Memasukkan Nilai ke Dalam Teks

inisiasiUpdateData()

//Selesai

//Data kalkulasi tabel // Belum Selesai
document.getElementById('update_form').addEventListener('submit', function(event){
  event.preventDefault();
  console.log(totalEmisi)

  gantiTeks()

  //console.log(allScope.scope1.toFixed(2))
  console.log(jumlahTotalEmTahun)

  //Ambil nilai dari inputan user
  const valSolarPanel= document.getElementById('id_solar_panel').value
  const valJenisAC = document.getElementById('id_jenis_ac').value
  const valBisKuning = document.getElementById('id_bis_kuning').value
  const valCarFree = document.getElementById('id_car_free').value
  const valDme = document.getElementById('id_dme').value
  const valDac = document.getElementById('id_dac').value

  //Ambil Tabel
  const tabelEmisi = document.getElementById('id_table_emisi')

  //Memasukkan nilai ke tabel
  tabelEmisi.rows[2].cells[2].innerText = valSolarPanel
  tabelEmisi.rows[3].cells[2].innerText = valJenisAC
  tabelEmisi.rows[4].cells[2].innerText = valBisKuning
  tabelEmisi.rows[5].cells[2].innerText = valCarFree
  tabelEmisi.rows[6].cells[2].innerText = valDme
  tabelEmisi.rows[7].cells[2].innerText = valDac

  //Perhitungan Dalam Table
  let totalFSP = 12494.53 * (valSolarPanel/100) // Rumus Benar
  let totalJAC = (((13148364*68.9/100)*valJenisAC/100 - (4.2 * (13148364*68.9/100)*valJenisAC/100)/5.7 )*0.87)/1000// Rumus benar
  let totalBis = valBisKuning*53.831//(53.831*(10 * valBisKuning/100))-((((((315.85-(315.85*20/100))*7.8*16)/250)*(10 * valBisKuning/100))*0.87)*312/1000)  // Rumus salah
  let totalCFD = 2.97736*9*valCarFree // Rumus Benar sudah diubah
  let totalDME = (202.43-162.16)*valDme/100 // Rumus Benar sudah diubah
  let totalDAC = valDac * 1
  let totalPenurunan = totalFSP + totalJAC + totalBis + totalCFD + totalDME + totalDAC

  //Hasil perhitungan dalam tabel
  tabelEmisi.rows[2].cells[4].innerText = totalFSP.toFixed(2)
  tabelEmisi.rows[3].cells[4].innerText = totalJAC.toFixed(2)
  tabelEmisi.rows[4].cells[4].innerText = totalBis.toFixed(2)
  tabelEmisi.rows[5].cells[4].innerText = totalCFD.toFixed(2)
  tabelEmisi.rows[6].cells[4].innerText = totalDME.toFixed(2)
  tabelEmisi.rows[7].cells[4].innerText = totalDAC.toFixed(2)

  tabelEmisi.rows[8].cells[1].innerText = totalPenurunan.toFixed(2)

  //Hasil hitung persentae tabel
  let tabPersenFSP = (totalFSP/jumlahTotalEmTahun*100)
  let tabPersenJAC = (totalJAC/jumlahTotalEmTahun*100)
  let tabPersenBis = (totalBis/jumlahTotalEmTahun*100)
  let tabPersenCFD = (totalCFD/jumlahTotalEmTahun*100)
  let tabPersenDME = (totalDME/jumlahTotalEmTahun*100)
  let tabPersenDAC = (totalDAC/jumlahTotalEmTahun*100)
  let totalTabPersen = tabPersenFSP + tabPersenJAC + tabPersenBis + tabPersenCFD +tabPersenDME+ tabPersenDAC

  tabelEmisi.rows[2].cells[5].innerText = tabPersenFSP.toFixed(2)
  tabelEmisi.rows[3].cells[5].innerText = tabPersenJAC.toFixed(2)
  tabelEmisi.rows[4].cells[5].innerText = tabPersenBis.toFixed(2)
  tabelEmisi.rows[5].cells[5].innerText = tabPersenCFD.toFixed(2)
  tabelEmisi.rows[6].cells[5].innerText = tabPersenDME.toFixed(2)
  tabelEmisi.rows[7].cells[5].innerText = tabPersenDAC.toFixed(2)

  tabelEmisi.rows[8].cells[2].innerText = totalTabPersen.toFixed(2)

  let hitungEmisiListrik = totalEmisi.TtListrik - totalFSP - totalJAC - totalDAC
  totalEmisi.TtListrik = hitungEmisiListrik

  let hitungEmisiTransport = totalEmisi.TtTransportasi - totalBis - totalCFD
  totalEmisi.TtTransportasi = hitungEmisiTransport

  let hitungEmisiLPG = totalEmisi.TtLPG - totalDME
  totalEmisi.TtLPG = hitungEmisiLPG

  jumlahTotalEmTahun = totalEmisi.TtListrik + totalEmisi.TtAC + totalEmisi.TtTransportasi  + 
    totalEmisi.TtSemen + totalEmisi.TtLPG + totalEmisi.TtSampah + totalEmisi.TtKertas
  console.log(jumlahTotalEmTahun)
  
  //Update perhitungan Nilai Scope
  hitungScope1 = totalEmisi.TtTransportasi + totalEmisi.TtLPG + totalEmisi.TtAC
  hitungScope2 = totalEmisi.TtListrik
  hitungScope3 = totalEmisi.TtSampah + totalEmisi.TtKertas + totalEmisi.TtSemen

  //Update perhitungan Nilai Persen Scope
  persenScope1 = (hitungScope1/jumlahTotalEmTahun)*100
  persenScope2 = (hitungScope2/jumlahTotalEmTahun)*100
  persenScope3 = (hitungScope3/jumlahTotalEmTahun)*100

  allScope = {
    scope1: hitungScope1,
    scope2: hitungScope2,
    scope3: hitungScope3,
  }

  persenScope = {
    persenScope1 : persenScope1,
    persenScope2 : persenScope2,
    persenScope3 : persenScope3,
  }
  jumlahCarbonCapture = 52133-jumlahTotalEmTahun

  potensiCarbonOffset = jumlahCarbonCapture * (5 * 16171.30)
  
  //Update Memasukkan Nilai ke Dalam Teks

  inisiasiUpdateData()

  //Update nilai tabel
  sumEmChart.data.datasets[0].data = [totalEmisi.TtListrik.toFixed(2), totalEmisi.TtSemen, totalEmisi.TtTransportasi.toFixed(2), 
    totalEmisi.TtAC, totalEmisi.TtLPG.toFixed(2), totalEmisi.TtSampah , totalEmisi.TtKertas]
  sumEmChart.update()

  scope1Chart.data.datasets[0].data = [allScope.scope1, allScope.scope2, allScope.scope3]
  scope2Chart.data.datasets[0].data = [allScope.scope1, allScope.scope2, allScope.scope3]
  scope3Chart.data.datasets[0].data = [allScope.scope1, allScope.scope2, allScope.scope3]

  scope1Chart.update()
  scope2Chart.update()
  scope3Chart.update()

  carbCaptChart.data.datasets[0].data = [52133, jumlahTotalEmTahun.toFixed(2), jumlahCarbonCapture.toFixed(2)]
  carbCaptChart.update()
  //updateData()
  txtRpKarbonKredit.innerText = `Rp ${(totalPenurunan * 16171.30).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  
  //console.log(totalEmisi)
  //Reset Form
  document.getElementById('update_form').reset
});


// Data awal untuk chart
let chartData = {
    labels: ['Listrik', 'Semen', 'Transportasi', 'AC', 'LPG', 'Sampah', 'Kertas'],
    datasets: [{
        label: 'tCO2eq',
        //data: [emSources.Listrik, emSources.AC, emSources.Transportasi, emSources.Semen, emSources.LPG, emSources.Sampah, emSources.Kertas],
        data:[totalEmisi.TtListrik, totalEmisi.TtSemen, totalEmisi.TtTransportasi, totalEmisi.TtAC, totalEmisi.TtLPG, totalEmisi.TtSampah , totalEmisi.TtKertas],
        backgroundColor: 'rgb(0, 65, 108)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
    }]
};

// Inisialisasi Bar chart horizontal
let sumEmChart = new Chart(chartCtx, {
    type: 'bar',
    data: chartData,
    options: {
        plugins:{
          legend: {
            display: false,
          },
          datalabels:{
            anchor:'end',
            align:'right',
          },
        },
        indexAxis: 'y',
        responsive: true,
        scales: {
            x: {
                beginAtZero: true,
            }
        },
        layout:{
          padding:{
            right:60
          }
        }
    },
    plugins:[ChartDataLabels],
});

// Konfigurasi Scope 1 Doughnut Chart 
let scope1Chart = new Chart(scope1CTX, {
    type: 'doughnut',
    data: {
      labels: ['Scope 1', 'Scope 2', 'Scope 3'],
      datasets: [{
        data: [allScope.scope1, allScope.scope2, allScope.scope3],
        backgroundColor: ['rgb(0, 65, 108)', 'rgba(54, 162, 235, 0.5)', 'rgba(54, 162, 235, 0.5)'],
        hoverBackgroundColor: ['rgb(0, 65, 108)', 'rgba(54, 162, 235, 0.5)', 'rgba(54, 162, 235, 0.5)'],
      }]
    },
    options: {
      plugins:{
        legend: {
          display: false
        }
      },
      responsive: true,
      maintainAspectRatio: true
    }
  });

// Konfigurasi Scope 2 Doughnut Chart 
  let scope2Chart = new Chart(scope2CTX, {
    type: 'doughnut',
    data: {
      labels: ['Scope 1', 'Scope 2', 'Scope 3'],
      datasets: [{
        data: [allScope.scope1, allScope.scope2, allScope.scope3],
        backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgb(0, 65, 108)', 'rgba(54, 162, 235, 0.5)'],
        hoverBackgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgb(0, 65, 108)', 'rgba(54, 162, 235, 0.5)']
      }]
    },
    options: {
      plugins:{
        legend: {
          display: false
        }
      },
      responsive: true,
      maintainAspectRatio: true
    }
  });

  // Konfigurasi Scope 3 Doughnut Chart 
  let scope3Chart = new Chart(scope3CTX, {
    type: 'doughnut',
    data: {
      labels: ['Scope 1', 'Scope 2', 'Scope 3'],
      datasets: [{
        data: [allScope.scope1, allScope.scope2, allScope.scope3],
        backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgb(0, 65, 108)'],
        hoverBackgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgb(0, 65, 108)']
      }]
    },
    options: {
      plugins:{
        legend: {
          display: false
        }
      },
      responsive: true,
      maintainAspectRatio: true
    }
  });

  //Konfigurasi Grafik Canvas Serapan Hutan UI
  let serapHUIChart = new Chart(serapHUI, {
    type:'bar',
    data:{
      labels:['Wallace Barat', 'Wallace Timur', 'Vegetasi Alam'],
      datasets:[{
        label:['tCO2eq'],
        data: [21726.12, 18062.97, 12344.22],
        backgroundColor:['rgb(0, 65, 108)','rgb(0, 65, 108)','rgb(0, 65, 108)'],
        borderColor: 'rgb(0, 65, 108)',
      }]
    },
    options:{
      plugins:{
        title:{
          text:'tCO2eq',
          display:true,
          position:'top'
        },
        legend:{
          display:false,
        },
        datalabels:{
          anchor:'end',
          align:'top',
        },
      },
      indexAxis:'x',
      scales:{
        x:{
          offset:true
        },
        y: {
          display:true
        }
      },
    },
    plugins:[ChartDataLabels]
  }) 

//Konfigurasi Grafik Canvas Carbon Capture
let carbCaptChart = new Chart (carbCapt,{
  type:'bar',
  data:{
    labels:['Serapan Hutan UI', 'Emisi GRK UI 2023', 'Carbon Offset'],
    datasets:[{
      label:['tCO2eq'],
      data:[52133, jumlahTotalEmTahun, jumlahCarbonCapture.toFixed(2)],
      backgroundColor:['rgb(0, 108, 27)', 'rgb(159, 69, 0)', 'rgb(0, 65, 108)'],
    }]
  },
  options:{
    plugins:{
      legend: {
        display: false,
        position: 'bottom'
      },
      datalabels:{
        anchor:'end',
        align:'right',
      },
    },
    indexAxis: 'y',
    responsive: true,
    scales: {
        x: {
            beginAtZero: true,
        },
        y: {
            display:true
        }
    },
    layout:{
      padding:{
        right:60
      }
    }
  },
  plugins:[ChartDataLabels]
})

//Konfigurasi Grafik Mikro Alga UI
let mikroAlgaChart = new Chart (mikroAlga, {
  type:'bar',
    data:{
      labels:['Kenanga', 'Agathis', 'Mahomi', 'Puspa', 'Ulin', 'Salam'],
      datasets:[{
        label:['tCO2eq'],
        data: [53.29, 40.30, 260.42, 536.54, 1772.58, 347.71],
        backgroundColor:['rgb(0, 65, 108)','rgb(0, 65, 108)','rgb(0, 65, 108)'],
        borderColor: 'rgb(0, 65, 108)',
      }]
    },
    options:{
      plugins:{
        title:{
          text:'tCO2eq',
          display:true,
          position:'top'
        },
        legend:{
          display:false,
        },
        datalabels:{
          anchor:'end',
          align:'top',
        },
      },
      indexAxis:'x',
      scales:{
        x:{
          offset:true
        },
        y: {
          display:true
        }
      },
    },
    plugins:[ChartDataLabels]
  }) 



//Fungsi Pengganti tahun dan update data
function gantiTeks() {
  // Ambil elemen dropdown
  let dropdown = document.getElementById('id_tahun_emisi');
  
  function inisiasiDataTahun(){
    jumlahTotalEmTahun = totalEmisi.TtListrik + totalEmisi.TtAC + totalEmisi.TtTransportasi  + 
      totalEmisi.TtSemen + totalEmisi.TtLPG + totalEmisi.TtSampah + totalEmisi.TtKertas

  
    //Update perhitungan Nilai Scope
    hitungScope1 = totalEmisi.TtTransportasi + totalEmisi.TtLPG + totalEmisi.TtAC
    hitungScope2 = totalEmisi.TtListrik
    hitungScope3 = totalEmisi.TtSampah + totalEmisi.TtKertas + totalEmisi.TtSemen

    //Update perhitungan Nilai Persen Scope
    persenScope1 = (hitungScope1/jumlahTotalEmTahun)*100
    persenScope2 = (hitungScope2/jumlahTotalEmTahun)*100
    persenScope3 = (hitungScope3/jumlahTotalEmTahun)*100

    allScope = {
      scope1: hitungScope1,
      scope2: hitungScope2,
      scope3: hitungScope3,
    }

    persenScope = {
      persenScope1 : persenScope1,
      persenScope2 : persenScope2,
      persenScope3 : persenScope3,
    }
    jumlahCarbonCapture = 52133-jumlahTotalEmTahun

    potensiCarbonOffset = jumlahCarbonCapture * (5 * 16171.30)
  
    //Update Memasukkan Nilai ke Dalam Teks

    txtPersenScope1.innerText = `${persenScope.persenScope1.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`
    txtPersenScope2.innerText = `${persenScope.persenScope2.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`
    txtPersenScope3.innerText = `${persenScope.persenScope3.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`


    txthasilScope1.innerText = allScope.scope1.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    txthasilScope2.innerText = allScope.scope2.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    txthasilScope3.innerText = allScope.scope3.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

    txtHasilTotEmisi.innerText = `${jumlahTotalEmTahun.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} tCO2eq`

    txtRpHasilCarbonOff.innerText = `Rp ${potensiCarbonOffset.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    txtRpHasilCreditAlga.innerText = `Rp ${(3010.84 * 16171.30).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    txtRpKarbonKredit.innerText = `Rp ${(0).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

    //Update nilai tabel
    sumEmChart.data.datasets[0].data = [totalEmisi.TtListrik, totalEmisi.TtSemen, totalEmisi.TtTransportasi, 
     totalEmisi.TtAC, totalEmisi.TtLPG, totalEmisi.TtSampah , totalEmisi.TtKertas]
    sumEmChart.update()

    scope1Chart.data.datasets[0].data = [allScope.scope1, allScope.scope2, allScope.scope3]
    scope2Chart.data.datasets[0].data = [allScope.scope1, allScope.scope2, allScope.scope3]
    scope3Chart.data.datasets[0].data = [allScope.scope1, allScope.scope2, allScope.scope3]

    scope1Chart.update()
    scope2Chart.update()
    scope3Chart.update()

    carbCaptChart.data.datasets[0].data = [52133, jumlahTotalEmTahun, jumlahCarbonCapture.toFixed(2)]
    carbCaptChart.update()
  }

 if(dropdown.value == 2023){
  //Update data per-tahun 2023
  totalEmisi = {
    TtListrik: 24338.46,
    TtAC: 1634.50,
    TtTransportasi: 1252.87,
    TtSemen: 6779.05,
    TtLPG: 202.43,
    TtSampah: 93.83,
    TtKertas: 62.15,
  }
  //console.log(totalEmisi)

  document.getElementById('judul_skenario').innerText = "Skenario 1 - Emisi Baseline"

  document.getElementById("visibility_langkah_mitigasi").style.display = "none";
  document.getElementById("visibility_kredit_mitigasi").style.display = "none";

  inisiasiDataTahun()

 } else if (dropdown.value == 2024){
  //Update data per-tahun 2024
  totalEmisi = {
    TtListrik: 24594.08,
    TtAC: 1701.18,
    TtTransportasi: 1260.38,
    TtSemen: 7.86,
    TtLPG: 204.56,
    TtSampah: 94.00,
    TtKertas: 62.80,
  }
  //console.log(totalEmisi)

  document.getElementById('judul_skenario').innerText = "Skenario 2 - Mitigasi Penurunan Emisi"

  document.getElementById("visibility_langkah_mitigasi").style.display = "";
  document.getElementById("visibility_kredit_mitigasi").style.display = "";

  inisiasiDataTahun()
  //console.log(potensiCarbonOffset.toFixed(2))
} else {
  //Update data per-tahun 2025
  totalEmisi = {
    TtListrik: 24849.69,
    TtAC: 1701.18,
    TtTransportasi: 1267.88,
    TtSemen: 7.86,
    TtLPG: 206.69,
    TtSampah: 94.18,
    TtKertas: 63.45,
  }
  //console.log(totalEmisi)

  document.getElementById('judul_skenario').innerText = "Skenario 2 - Mitigasi Penurunan Emisi"

  document.getElementById("visibility_langkah_mitigasi").style.display = "";
  document.getElementById("visibility_kredit_mitigasi").style.display = "";

  inisiasiDataTahun()
  }
}

function inisiasiUpdateData(){
  txtPersenScope1.innerText = `${persenScope.persenScope1.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`
  txtPersenScope2.innerText = `${persenScope.persenScope2.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`
  txtPersenScope3.innerText = `${persenScope.persenScope3.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`


  txthasilScope1.innerText = allScope.scope1.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  txthasilScope2.innerText = allScope.scope2.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  txthasilScope3.innerText = allScope.scope3.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  txtHasilTotEmisi.innerText = `${jumlahTotalEmTahun.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} tCO2eq`

  txtRpHasilCarbonOff.innerText = `Rp ${potensiCarbonOffset.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  txtRpHasilCreditAlga.innerText = `Rp ${(3010.84 * 16171.30).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  txtRpKarbonKredit.innerText = `Rp ${(0).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}