import {Component, OnInit} from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import {PdfMakeWrapper, Stack, Txt} from 'pdfmake-wrapper';
import {AttestationRequest} from '../../model/attestation-request';
import {DatePipe} from '@angular/common';
import pdfFonts from 'src/assets/fonts/pdkmake-latoblack/custom-fonts-latoblack-rnsmiles.js';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  request = new AttestationRequest();

  constructor(public datepipe: DatePipe){}

  ngOnInit() {
  }

  frenchDateFormating() {
    const dateConverting = new Date(this.request.birthdate);
    return this.datepipe.transform(dateConverting, 'dd/MM/yyyy');
  }

  generatePdf() {
    //  const documentDefinition = { content: 'This is for testing.' };
    // console.log(this.request.fullname + ' - ' + this.frenchDateFormating() + ' - ' + this.request.address + ' - ' + this.request.reasonSelection);
    // let text = this.request.fullname + ' - ' + this.frenchDateFormating() + ' - ' + this.request.address + ' - ' + this.request.reasonSelection;

    PdfMakeWrapper.setFonts(pdfFonts, {
      latoblack: {
        normal: 'Lato-Regular.ttf',
        bold: 'Lato-Bold.ttf',
        italics: 'Lato-Italic.ttf',
        bolditalics: 'Lato-BoldItalic.ttf'
      },
      rnsmiles: {
        normal: 'RNSMiles-Regular.otf',
        bold: 'RNSMiles-Bold.otf',
        italics: 'RNSMiles-BoldItalic.otf',
        bolditalics: 'RNSMiles-RegularItalic.otf'
      }
    });

    PdfMakeWrapper.useFont('latoblack');

    const pdf = new PdfMakeWrapper();

    pdf.add(
      new Txt('ATTESTATION DE DÉPLACEMENT DÉROGATOIRE')
        .alignment('center')
        .bold()
        .fontSize(16)
        .margin([ 5, 1])
        .end
    );

    pdf.add(
      new Txt('En application de l’article 1er du décret du 16 mars 2020 portant réglementation des déplacements dans le cadre de la lutte contre la propagation du virus Covid-19 :\n')
        .end
    );

    pdf.add(
      new Txt('Je soussigné(e)\n')
        .margin([10, 2, 6, 15])
        .fontSize(14)
        .end
    );

    PdfMakeWrapper.useFont('rnsmiles');
    pdf.add(
      new Txt('Hello world!').alignment('center').bold().fontSize(25).font('rnsmiles').end
    );
    pdf.add('/n');
    pdf.add('MALIKA Le lynx');

    pdf.create().download();
  }

}
