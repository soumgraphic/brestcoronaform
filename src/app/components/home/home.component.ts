import {Component, OnInit} from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import {AttestationRequest} from '../../model/attestation-request';
import {DatePipe} from '@angular/common';
import pdfFonts from 'src/assets/fonts/pdkmake-latoblack/custom-fonts-latoblack-rnsmiles.js';
import {PDFDocument, StandardFonts} from 'pdf-lib';
import {Reason} from '../../model/reason';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  request = new AttestationRequest();

  // -- Reason List
  REASON = [
    {
      label: 'PRO',
      value: Reason.PRO
    },
    {
      label: 'Achat de première nécessité',
      value: Reason.SUPERMARKET
    },
    {
      label: 'Raison de santé',
      value: Reason.HEALTH
    },
    {
      label: 'Assistance famille ou personne vulnérable',
      value: Reason.ASSISTANCE_TO_VULNERABLE_PEOPLE
    },
    {
      label: 'Activité physique individuelle',
      value: Reason.INDIVIDUAL_PHYSICAL_ACTIVITY
    }];

  constructor(public datepipe: DatePipe) {}

  ngOnInit() {
  }

  frenchDateFormating() {
    const dateConverting = new Date(this.request.birthdate);
    return this.datepipe.transform(dateConverting, 'dd/MM/yyyy');
  }

  async generatePdf() {
    // const existingPdfBytes = './assets/demande-template.pdf';
    const existingPdfBytes = await fetch('./assets/demande-template.pdf').then(res => res.arrayBuffer());

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Embed the Helvetica font

    const helveticaFont = pdfDoc.embedFont(StandardFonts.Helvetica);
    const FONT_SIZE = 11;

    // Get the first page of the document
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Get the width and height of the first page
    const {width, height} = firstPage.getSize();

    const adressWithCityAndCodePostal = this.request.address + ', ' + this.request.postalcode + ' ' + this.request.city;

    // Draw user informations
    firstPage.drawText(this.request.fullname || '', { x: 135, y: 622, size: FONT_SIZE });
    firstPage.drawText(this.frenchDateFormating(), { x: 135, y: 593, size: FONT_SIZE });
    firstPage.drawText(adressWithCityAndCodePostal || '', { x: 135, y: 559, size: FONT_SIZE });

    switch (this.request.reason) {
      case Reason.PRO:
        firstPage.drawText('x', { x: 51, y: 425, size: 17 });
        break;
      case Reason.SUPERMARKET:
        firstPage.drawText('x', { x: 51, y: 350, size: 17 });
        break;
      case Reason.HEALTH:
        firstPage.drawText('x', { x: 51, y: 305, size: 17 });
        break;
      case Reason.ASSISTANCE_TO_VULNERABLE_PEOPLE:
        firstPage.drawText('x', { x: 51, y: 274, size: 17 });
        break;
      case Reason.INDIVIDUAL_PHYSICAL_ACTIVITY:
        firstPage.drawText('x', { x: 51, y: 229, size: 17 });
        break;
    }

    firstPage.drawText(this.request.city || '', { x: 375, y: 140, size: FONT_SIZE });
    firstPage.drawText(String(new Date().getDate()), { x: 478, y: 140, size: FONT_SIZE });
    firstPage.drawText(String(new Date().getMonth() + 1).padStart(2, '0'), { x: 502, y: 140, size: FONT_SIZE });
    firstPage.drawText(this.request.fullname, { x: 455, y: 95, size: FONT_SIZE });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();
    const fileName = 'Attestation déplacement dérogatoire - ' + this.request.fullname;
    this.createDownloadUrl(new Blob([pdfBytes], { type: 'application/pdf' }), fileName);
  }

  async createDownloadUrl(blob: Blob, fileName: string) {
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    console.log('Génération de votre attestation de déplacement dérogatoire en cours...');

    link.href = url;
    link.download = fileName;
    link.click();
  }

}
