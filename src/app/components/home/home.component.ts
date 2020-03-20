import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import {AttestationRequest} from '../../model/attestation-request';
import {DatePipe} from '@angular/common';
import pdfFonts from 'src/assets/fonts/pdkmake-latoblack/custom-fonts-latoblack-rnsmiles.js';
import {PDFDocument, StandardFonts} from 'pdf-lib';
import {Reason} from '../../model/reason';
import SignaturePad from 'signature_pad';
// import {SignaturePad} from 'angular2-signaturepad/signature-pad';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit  {

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

  // Signature connection to html canvas
  @ViewChild('sPad', {static: true}) signaturePadElement;
  signaturePad: any;

  constructor(public datepipe: DatePipe) {}

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
    this.resizeCanvas();
  }

  // Date conversion into french format
  frenchDateFormating() {
    const dateConverting = new Date(this.request.birthdate);
    return this.datepipe.transform(dateConverting, 'dd/MM/yyyy');
  }

  // Signature pad clear
  clear() {
    this.signaturePad.clear();
  }

  getSignatureDataURI() {
    if (this.signaturePad.isEmpty()) {
      alert('Veuillez mettre votre signature s.v.p');
    } else {
      return this.signaturePad.toDataURL();
    }
  }

  public resizeCanvas(): void {
    // Canvas responsive management
    const ratio: number = Math.max(window.devicePixelRatio || 1, 1);
    const canvas: any = this.signaturePad._canvas;
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext('2d').scale(ratio, ratio);
  }

  async generatePdf() {
    // Load pdf model
    const existingPdfBytes = await fetch('./assets/demande-template.pdf').then(res => res.arrayBuffer());

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Embed the Helvetica font

    const helveticaFont = pdfDoc.embedFont(StandardFonts.Helvetica);
    const FONT_SIZE = 11;

    // Get the first page of the document
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const adressWithCityAndCodePostal = this.request.address + ', ' + this.request.postalcode + ' ' + this.request.city;

    // Draw user informations
    firstPage.drawText(this.request.fullname || '', { x: 135, y: 622, size: FONT_SIZE });
    firstPage.drawText(this.frenchDateFormating(), { x: 135, y: 593, size: FONT_SIZE });
    firstPage.drawText(adressWithCityAndCodePostal || '', { x: 135, y: 559, size: FONT_SIZE });

    // Draw user reason selection
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
    // User name signature draw
    // firstPage.drawText(this.request.fullname, { x: 455, y: 95, size: FONT_SIZE });

    // User signature image getting
    const signature: string = this.getSignatureDataURI();
    const signatureImg = await pdfDoc.embedPng(signature);
    const signatureDim = signatureImg.scale(1 / (signatureImg.width / 150));

    firstPage.drawImage(signatureImg, {
      x: firstPage.getWidth() - signatureDim.width - 50,
      y: 30,
      width: signatureDim.width,
      height: signatureDim.height
    });

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
