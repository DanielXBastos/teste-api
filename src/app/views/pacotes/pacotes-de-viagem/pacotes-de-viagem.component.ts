import { Pack } from './../_models/pack';
import { IataCode } from './../_models/iataCode';
import { Hotel } from '../_models/hotel';
import { IataCodesService } from './../_services/iataCodes.service';
import { HotelsService } from './../_services/hotels.service';
import { FlightsService } from './../_services/flights.service';
import { Flight } from './../_models/flight';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pacotes-de-viagem',
  templateUrl: './pacotes-de-viagem.component.html',
  styleUrls: ['./pacotes-de-viagem.component.scss']
})
export class PacotesDeViagemComponent implements OnInit {

  packs: Pack[];
  cheapPacks: Pack[];
  hotels: Hotel[];
  flights: Flight[];
  iataCodes: IataCode[];

  constructor(private flightsService: FlightsService, private hotelsService: HotelsService, private iataCodesService: IataCodesService) { }

  ngOnInit(): void {
    this.getFlights();
  }

  // Formata valor para padrão brasileiro
  getBRLCurrency(price: number) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  }

  // Encontra as cidades pelo código Iata
  findCityByIataCode(iata: string) {
    return this.iataCodes === this.iataCodes ? this.iataCodes.find(f => f.id === iata).city : 'Não encontrado';
  }

  // Método para calcular a diferença de dias entre duas datas
  daysDiff(firstDate, secondDate) {
    firstDate = new Date(firstDate);
    secondDate = new Date(secondDate);
    const days = Math.floor(
      (Date.UTC(
        secondDate.getFullYear(),
        secondDate.getMonth(),
        secondDate.getDate()
      ) -
        Date.UTC(
          firstDate.getFullYear(),
          firstDate.getMonth(),
          firstDate.getDate()
        )) /
      (1000 * 60 * 60 * 24)
    );
    return days === 0 ? 1 : days;
  }

  // Encontra o menor valor de um pacote
  getLowestPackPrice(pack) {
    if (pack.length > 1) {
      return pack.find(p => p.fullPrice === Math.min.apply(Math, pack.map(x => x.fullPrice)));
    } else if (pack.length === 1) {
      return pack[0];
    }
  }

  // Monta a lista com os pacotes mais bataros
  getCheapPack() {
    const packs: Pack[] = [];
    this.iataCodes.forEach(iata => {
      const filteredPacks = this.getLowestPackPrice(this.packs.filter(p => p.arrivalAirport === iata.id));
      if (filteredPacks) {
        packs.push(filteredPacks);
      }
    });
    this.cheapPacks = packs;
  }

  // Monta a lista completa de pacotes
  getPacks() {
    let pack: Pack;
    const packs: Pack[] = [];
    this.flights.forEach(flight => {
      pack = {} as Pack;
      pack.flightId = flight.id;
      pack.fullPrice =
        this.daysDiff(flight.outboundDate, flight.inboundDate) *
        this.hotels.find(h => h.iata === flight.arrivalAirport).pricePerNight;
      pack.arrivalAirport = flight.arrivalAirport;
      pack.outboundDate = flight.outboundDate;
      pack.inboundDate = flight.inboundDate;
      pack.imageUrl = this.iataCodes.find(i => i.id === flight.arrivalAirport).imageUrl;
      packs.push(pack);
    });
    this.packs = packs;
    this.getCheapPack();
  }

  // Busca os voos
  getFlights() {
    this.flightsService.get().subscribe((flights: Flight[]) => {
      this.flights = flights;
      this.getHotels();
    });
  }

  // Busca os hoteis
  getHotels() {
    this.hotelsService.get().subscribe((hotels: Hotel[]) => {
      this.hotels = hotels;
      this.getIataCodes();
    });
  }

  // Busca os códigos iata
  getIataCodes() {
    this.iataCodesService.get().subscribe((iataCodes: IataCode[]) => {
      this.iataCodes = iataCodes;
      this.getPacks();
    });
  }
}
