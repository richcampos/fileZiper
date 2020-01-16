/* eslint-disable no-unused-vars */
import '../scss/styles.scss'
import pdf1 from '../assets/WMIA2019_ESP_Cambiamos_nuestra_forma_de_trabajar.pdf'
import pdf2 from '../assets/WMIA2019_ESP_Capacidades_para_el_exito_continuo.pdf'
import pdf3 from '../assets/WMIA2019_ESP_Construyendo_comunidades_fuertes.pdf'
import pdf4 from '../assets/WMIA2019_ESP_Creacion_de_valor_financiero.pdf'
import pdf5 from '../assets/WMIA2019_ESP_Indice_GRI.pdf'
import pdf6 from '../assets/WMIA2019_ESP_Modelo_de_creacion_de_Valor_Compartido.pdf'
import { saveAs } from 'file-saver'
const JSZip = require('jszip')

const zip = new JSZip()
const folder = zip.folder('PDFs')

const files = []

const index1 = document.getElementById('index1')
const btnMerge = document.getElementById('mergeBtn')
const btnSelect = document.getElementById('selectAll')
const btnRemove = document.getElementById('removeAll')
const loader = document.getElementById('loader')
const indexChildren = document.querySelectorAll('.pdf')

btnMerge.addEventListener('click', () => {
  loader.classList.add('load')
  files.forEach(file => {
    // eslint-disable-next-line no-undef
    const blobPromise = fetch(file).then(response => {
      if (response.status === 200) return response.blob()
      return Promise.reject(new Error(response.statusText))
    })
    const name = file.split('/').reverse()[0]
    folder.file(name, blobPromise)
  })

  zip.generateAsync({ type: 'blob', compression: 'DEFLATE' })
    .then(blob => {
      saveAs(blob, 'PDFs')
      loader.classList.remove('load')
    })
    .catch(e => console.log(e))
})

indexChildren.forEach(pdf => {
  pdf.addEventListener('click', () => {
    pdf.classList.toggle('click')
    addFiles()
    removeFiles()
  })
})

btnSelect.addEventListener('click', () => {
  indexChildren.forEach(pdf => {
    pdf.classList.add('click')
    addFiles()
  })
})

btnRemove.addEventListener('click', () => {
  indexChildren.forEach(pdf => {
    pdf.classList.remove('click')
    removeFiles()
  })
})

function addFiles () {
  indexChildren.forEach(pdf => {
    if (pdf.classList.contains('click')) {
      const file = pdf.firstChild.getAttribute('data')
      const includeFile = files.includes(`./PDFs/${file}.pdf`)
      if (!includeFile) {
        files.push(`./PDFs/${file}.pdf`)
      }
    }
  })
  btnMerge.innerHTML = `Download (${files.length})`
}

function removeFiles () {
  indexChildren.forEach(pdf => {
    if (!pdf.classList.contains('click')) {
      const file = pdf.firstChild.getAttribute('data')
      const index = files.indexOf(`./PDFs/${file}.pdf`)
      const includeFile = files.includes(`./PDFs/${file}.pdf`)
      if (includeFile) {
        files.splice(index, 1)
      }
    }
  })
  btnMerge.innerHTML = `Download (${files.length})`
}
