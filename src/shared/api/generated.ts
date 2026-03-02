import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Airlines: { input: any; output: any; }
  Airports: { input: any; output: any; }
  AirportsLocation: { input: any; output: any; }
  Cases: { input: any; output: any; }
  CountryCases: { input: any; output: any; }
  CurrencyRates: { input: any; output: any; }
  Error: { input: any; output: any; }
  Errors: { input: any; output: any; }
  FlightOffer: { input: any; output: any; }
  GateInfo: { input: any; output: any; }
  GeoJson: { input: any; output: any; }
  HotelsAutocomplete: { input: any; output: any; }
  HotelsOffers: { input: any; output: any; }
  Locale: { input: any; output: any; }
  MetaFlightOffer: { input: any; output: any; }
  MinPricesAviasales: { input: any; output: any; }
  Object: { input: any; output: any; }
  Passangers: { input: any; output: any; }
  Proposals: { input: any; output: any; }
  Segment: { input: any; output: any; }
  TechnicalStops: { input: any; output: any; }
  TermMap: { input: Record<string, Term>; output: Record<string, Term>; }
  TicketUri: { input: any; output: any; }
  ticketUrl: { input: any; output: any; }
};

export type AdditionalTariffInfo = {
  change_after_flight: ReturnFlight;
  change_before_flight: ReturnFlight;
  return_after_flight: ReturnFlight;
  return_before_flight: ReturnFlight;
};

export type AllCountries = {
  Alpha2Code: Scalars['String']['output'];
  Alpha3Code: Scalars['String']['output'];
  Area?: Maybe<Scalars['Int']['output']>;
  CurrencyCode: Scalars['String']['output'];
  CurrencyName: Scalars['String']['output'];
  CurrencySymbol: Scalars['String']['output'];
  Flag: Scalars['String']['output'];
  FlagPng: Scalars['String']['output'];
  Latitude: Scalars['String']['output'];
  Longitude: Scalars['String']['output'];
  Name: Scalars['String']['output'];
  NativeLanguage: Scalars['String']['output'];
  NativeName: Scalars['String']['output'];
  NumericCode?: Maybe<Scalars['Int']['output']>;
  Region: Scalars['String']['output'];
  SubRegion: Scalars['String']['output'];
};

export type Amenity = {
  groupName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Autocomplete = {
  cases: Array<Maybe<Scalars['Cases']['output']>>;
  city_code?: Maybe<Scalars['String']['output']>;
  city_name?: Maybe<Scalars['String']['output']>;
  code: Scalars['String']['output'];
  coordinates?: Maybe<Coordinates>;
  country_cases: Array<Maybe<Scalars['CountryCases']['output']>>;
  country_code: Scalars['String']['output'];
  country_name: Scalars['String']['output'];
  id: Scalars['String']['output'];
  index_strings?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  main_airport_name?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  state_code: Scalars['String']['output'];
  type: Variant;
  weight?: Maybe<Scalars['Int']['output']>;
};

export type Baggage = {
  count: Scalars['Int']['output'];
};

export type ChangedCityResponse = {
  city: CityStatusResponse;
  country: CountryStatusResponse;
  success: Scalars['Boolean']['output'];
};

export type ChangedCityResult = ChangedCityResponse | ErrorResponse;

export type City = {
  _id?: InputMaybe<Scalars['String']['input']>;
  country_code: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CityStatusResponse = {
  _id: Scalars['String']['output'];
  country_code: Scalars['String']['output'];
  country_id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  status: DestinationsStatuses;
};

export type Coordinates = {
  lat: Scalars['Float']['output'];
  lon: Scalars['Float']['output'];
};

export type Country = {
  country_code: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CountryData = {
  city_name?: Maybe<Scalars['String']['output']>;
  country_name?: Maybe<Scalars['String']['output']>;
  iata_code?: Maybe<Scalars['String']['output']>;
};

export type CountryStatusResponse = {
  _id: Scalars['String']['output'];
  cities: Array<CityStatusResponse>;
  country_code: Scalars['String']['output'];
  name: Scalars['String']['output'];
  status: DestinationsStatuses;
};

export enum DestinationsStatuses {
  NotSpecified = 'NOT_SPECIFIED',
  ToVisit = 'TO_VISIT',
  Visited = 'VISITED'
}

export type Equipment = {
  code: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type ErrorResponse = {
  errors?: Maybe<Array<Scalars['String']['output']>>;
};

export type FlightLeg = {
  arrival_unix_timestamp: Scalars['Int']['output'];
  departure_unix_timestamp: Scalars['Int']['output'];
  destination: Scalars['String']['output'];
  equipment: Equipment;
  local_arrival_date_time: Scalars['String']['output'];
  local_departure_date_time: Scalars['String']['output'];
  operating_carrier_designator: OperatinCarrierDesignator;
  origin: Scalars['String']['output'];
  signature: Scalars['String']['output'];
  technical_stops: Scalars['TechnicalStops']['output'];
};

export type FlightOffers = {
  flightsData: FlightsDataResponse;
  isOver: Scalars['Boolean']['output'];
  lastUpdateTimestamp: Scalars['Int']['output'];
};

export type FlightTerms = {
  flight_terms: Scalars['TermMap']['output'];
};

export type FlightsDataResponse = PayoutsResponse & {
  flight_legs: Array<FlightLeg>;
  is_over: Scalars['Boolean']['output'];
  last_update_timestamp: Scalars['Int']['output'];
  proposals: Array<Proposal>;
  search_params: SearchParams;
};

export type Handbags = {
  count: Scalars['Int']['output'];
  height: Scalars['Int']['output'];
  length: Scalars['Int']['output'];
  unlimited_weight: Scalars['Boolean']['output'];
  width: Scalars['Int']['output'];
};

export type LoggedUser = {
  errors?: Maybe<Array<Maybe<Scalars['Error']['output']>>>;
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type MarketingCarrierDesignator = {
  airline_id: Scalars['String']['output'];
  carrier: Scalars['String']['output'];
  number: Scalars['String']['output'];
};

export type MetaDestination = {
  search_id?: Maybe<Scalars['String']['output']>;
};

export type MinimumFare = {
  baggage: Baggage;
  change_after_flight: ReturnFlight;
  change_before_flight: ReturnFlight;
  code: Scalars['String']['output'];
  handbags: Handbags;
  return_after_flight: ReturnFlight;
  return_before_flight: ReturnFlight;
};

export type MoreHotelsOffers = {
  proposals?: Maybe<Scalars['Proposals']['output']>;
};

export type Mutation = {
  changeCityStatus: ChangedCityResult;
  createdUser?: Maybe<LoggedUser>;
  login?: Maybe<LoggedUser>;
  removeCity: ChangedCityResult;
  removeUser?: Maybe<SimpleResponse>;
  sendFeedback?: Maybe<SimpleResponse>;
  socialAuth?: Maybe<LoggedUser>;
};


export type MutationChangeCityStatusArgs = {
  city: City;
  status: DestinationsStatuses;
};


export type MutationCreatedUserArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRemoveCityArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSendFeedbackArgs = {
  content: Scalars['String']['input'];
};


export type MutationSocialAuthArgs = {
  authType: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
};

export type OperatinCarrierDesignator = {
  airline_id: Scalars['String']['output'];
  carrier: Scalars['String']['output'];
  number: Scalars['String']['output'];
};

export type PayoutsResponse = {
  flight_legs: Array<FlightLeg>;
  is_over: Scalars['Boolean']['output'];
  last_update_timestamp: Scalars['Int']['output'];
  search_params: SearchParams;
};

export type Price = {
  currency_code: Scalars['String']['output'];
  value: Scalars['Int']['output'];
};

export type PriceWay = {
  departure_at: Scalars['String']['output'];
  return_at?: Maybe<Scalars['String']['output']>;
  value: Scalars['Float']['output'];
};

export type Proposal = {
  agent_id: Scalars['Int']['output'];
  flight_terms: FlightTerms;
  id: Scalars['String']['output'];
  minimum_fare: MinimumFare;
  price: Price;
  price_per_person: Price;
  transfer_terms: Array<Array<TransferTerm>>;
};

export type Query = {
  airports: Array<Autocomplete>;
  allCountries: Array<AllCountries>;
  buyTicket?: Maybe<TicketUriResponse>;
  countryDataByIata?: Maybe<Array<Maybe<CountryData>>>;
  flightOffers?: Maybe<FlightOffers>;
  geojson?: Maybe<GeoJsonResponse>;
  hotelAmenities?: Maybe<Array<Maybe<Amenity>>>;
  hotelsAutocomplete?: Maybe<Scalars['HotelsAutocomplete']['output']>;
  hotelsOffers?: Maybe<Scalars['HotelsOffers']['output']>;
  hotelsSearchId?: Maybe<Scalars['String']['output']>;
  locales?: Maybe<Scalars['Locale']['output']>;
  minCalendarPrices?: Maybe<Scalars['MinPricesAviasales']['output']>;
  moreFlightOffers?: Maybe<FlightOffers>;
  moreHotelsOffers?: Maybe<MoreHotelsOffers>;
  pricesOneWay: Array<PriceWay>;
  pricesRoundTrip: Array<PriceWay>;
  searchFlightsParams?: Maybe<SearchId>;
  userCountries?: Maybe<UserCountriesResult>;
};


export type QueryAirportsArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  text: Scalars['String']['input'];
  types?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type QueryBuyTicketArgs = {
  searchId: Scalars['String']['input'];
  url: Scalars['Int']['input'];
};


export type QueryCountryDataByIataArgs = {
  iataCodes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryFlightOffersArgs = {
  lastUpdateTimestamp?: InputMaybe<Scalars['Int']['input']>;
  searchId: Scalars['String']['input'];
};


export type QueryGeojsonArgs = {
  type: Scalars['String']['input'];
};


export type QueryHotelAmenitiesArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  language: Scalars['String']['input'];
};


export type QueryHotelsAutocompleteArgs = {
  lang?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  lookFor?: InputMaybe<Scalars['String']['input']>;
  query: Scalars['String']['input'];
};


export type QueryHotelsOffersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  roomsCount?: InputMaybe<Scalars['Int']['input']>;
  searchId: Scalars['String']['input'];
  sortAsc?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
};


export type QueryHotelsSearchIdArgs = {
  adultsCount: Scalars['Int']['input'];
  checkIn: Scalars['String']['input'];
  checkOut: Scalars['String']['input'];
  childAge1?: InputMaybe<Scalars['Int']['input']>;
  childAge2?: InputMaybe<Scalars['Int']['input']>;
  childAge3?: InputMaybe<Scalars['Int']['input']>;
  childrenCount?: InputMaybe<Scalars['Int']['input']>;
  cityId: Scalars['String']['input'];
  currency?: InputMaybe<Scalars['String']['input']>;
  hotelId?: InputMaybe<Scalars['String']['input']>;
  iata?: InputMaybe<Scalars['String']['input']>;
  lang?: InputMaybe<Scalars['String']['input']>;
  waitForResult?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryLocalesArgs = {
  locale: Scalars['String']['input'];
};


export type QueryMoreFlightOffersArgs = {
  flightsId?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};


export type QueryMoreHotelsOffersArgs = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  searchId: Scalars['String']['input'];
};


export type QueryPricesOneWayArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
  grouping?: InputMaybe<Scalars['String']['input']>;
  paging?: InputMaybe<Scalars['Object']['input']>;
  params: Scalars['Object']['input'];
  sorting?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPricesRoundTripArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
  params: Scalars['Object']['input'];
};


export type QuerySearchFlightsParamsArgs = {
  adults: Scalars['Int']['input'];
  children: Scalars['Int']['input'];
  currency: Scalars['String']['input'];
  departureDate: Scalars['String']['input'];
  destinationLocation: Scalars['String']['input'];
  infants: Scalars['Int']['input'];
  locale: Scalars['String']['input'];
  originLocation: Scalars['String']['input'];
  returnDate?: InputMaybe<Scalars['String']['input']>;
  travelClass?: InputMaybe<Scalars['String']['input']>;
};

export type ReturnFlight = {
  available: Scalars['Boolean']['output'];
};

export type SearchId = {
  resultsUrl: Scalars['String']['output'];
  searchId?: Maybe<Scalars['String']['output']>;
};

export type SearchParams = {
  passengers: Scalars['Passangers']['output'];
  source_kind: Scalars['String']['output'];
  trip_class: Scalars['String']['output'];
};

export type SimpleResponse = {
  errors?: Maybe<Scalars['Error']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type Term = {
  additional_tariff_info: AdditionalTariffInfo;
  baggage: Baggage;
  fare_code: Scalars['String']['output'];
  handbags: Handbags;
  is_charter: Scalars['Boolean']['output'];
  marketing_carrier_designator: MarketingCarrierDesignator;
  seats_available: Scalars['Int']['output'];
  trip_class: Scalars['String']['output'];
};

export type Ticket = {
  proposals: Array<Proposal>;
  segments: Array<Scalars['Segment']['output']>;
  signature: Scalars['String']['output'];
};

export type TicketUriResponse = {
  ticketUri?: Maybe<Scalars['TicketUri']['output']>;
};

export type TransferTerm = {
  is_virtual_interline: Scalars['Boolean']['output'];
};

export type TravelDestination = {
  country_code?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type User = {
  _id?: Maybe<Scalars['String']['output']>;
  authType?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  travelDestinations?: Maybe<Array<Maybe<TravelDestination>>>;
};

export type UserCountries = {
  countries: Array<CountryStatusResponse>;
};

export type UserCountriesResult = ErrorResponse | UserCountries;

export enum Variant {
  Airport = 'airport',
  City = 'city',
  Country = 'country'
}

export type GeoJsonResponse = {
  data?: Maybe<Scalars['GeoJson']['output']>;
};

export type AirportsQueryVariables = Exact<{
  text: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
}>;


export type AirportsQuery = { airports: Array<{ id: string, type: Variant, code: string, name: string, country_name: string, coordinates?: { lat: number, lon: number } | null }> };

export type SearchFlightsParamsQueryVariables = Exact<{
  adults: Scalars['Int']['input'];
  children: Scalars['Int']['input'];
  infants: Scalars['Int']['input'];
  locale: Scalars['String']['input'];
  currency: Scalars['String']['input'];
  departureDate: Scalars['String']['input'];
  destinationLocation: Scalars['String']['input'];
  originLocation: Scalars['String']['input'];
}>;


export type SearchFlightsParamsQuery = { searchFlightsParams?: { searchId?: string | null, resultsUrl: string } | null };


export const AirportsDocument = gql`
    query Airports($text: String!, $locale: String) {
  airports(text: $text, locale: $locale) {
    id
    type
    code
    name
    country_name
    coordinates {
      lat
      lon
    }
  }
}
    `;

/**
 * __useAirportsQuery__
 *
 * To run a query within a Vue component, call `useAirportsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAirportsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useAirportsQuery({
 *   text: // value for 'text'
 *   locale: // value for 'locale'
 * });
 */
export function useAirportsQuery(variables: AirportsQueryVariables | VueCompositionApi.Ref<AirportsQueryVariables> | ReactiveFunction<AirportsQueryVariables>, options: VueApolloComposable.UseQueryOptions<AirportsQuery, AirportsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<AirportsQuery, AirportsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<AirportsQuery, AirportsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<AirportsQuery, AirportsQueryVariables>(AirportsDocument, variables, options);
}
export function useAirportsLazyQuery(variables?: AirportsQueryVariables | VueCompositionApi.Ref<AirportsQueryVariables> | ReactiveFunction<AirportsQueryVariables>, options: VueApolloComposable.UseQueryOptions<AirportsQuery, AirportsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<AirportsQuery, AirportsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<AirportsQuery, AirportsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<AirportsQuery, AirportsQueryVariables>(AirportsDocument, variables, options);
}
export type AirportsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<AirportsQuery, AirportsQueryVariables>;
export const SearchFlightsParamsDocument = gql`
    query SearchFlightsParams($adults: Int!, $children: Int!, $infants: Int!, $locale: String!, $currency: String!, $departureDate: String!, $destinationLocation: String!, $originLocation: String!) {
  searchFlightsParams(
    adults: $adults
    children: $children
    infants: $infants
    locale: $locale
    currency: $currency
    departureDate: $departureDate
    destinationLocation: $destinationLocation
    originLocation: $originLocation
  ) {
    searchId
    resultsUrl
  }
}
    `;

/**
 * __useSearchFlightsParamsQuery__
 *
 * To run a query within a Vue component, call `useSearchFlightsParamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchFlightsParamsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useSearchFlightsParamsQuery({
 *   adults: // value for 'adults'
 *   children: // value for 'children'
 *   infants: // value for 'infants'
 *   locale: // value for 'locale'
 *   currency: // value for 'currency'
 *   departureDate: // value for 'departureDate'
 *   destinationLocation: // value for 'destinationLocation'
 *   originLocation: // value for 'originLocation'
 * });
 */
export function useSearchFlightsParamsQuery(variables: SearchFlightsParamsQueryVariables | VueCompositionApi.Ref<SearchFlightsParamsQueryVariables> | ReactiveFunction<SearchFlightsParamsQueryVariables>, options: VueApolloComposable.UseQueryOptions<SearchFlightsParamsQuery, SearchFlightsParamsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<SearchFlightsParamsQuery, SearchFlightsParamsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<SearchFlightsParamsQuery, SearchFlightsParamsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<SearchFlightsParamsQuery, SearchFlightsParamsQueryVariables>(SearchFlightsParamsDocument, variables, options);
}
export function useSearchFlightsParamsLazyQuery(variables?: SearchFlightsParamsQueryVariables | VueCompositionApi.Ref<SearchFlightsParamsQueryVariables> | ReactiveFunction<SearchFlightsParamsQueryVariables>, options: VueApolloComposable.UseQueryOptions<SearchFlightsParamsQuery, SearchFlightsParamsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<SearchFlightsParamsQuery, SearchFlightsParamsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<SearchFlightsParamsQuery, SearchFlightsParamsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<SearchFlightsParamsQuery, SearchFlightsParamsQueryVariables>(SearchFlightsParamsDocument, variables, options);
}
export type SearchFlightsParamsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<SearchFlightsParamsQuery, SearchFlightsParamsQueryVariables>;