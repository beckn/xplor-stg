/**
 * Interface for a catalog, which includes a descriptor and a list of providers.
 */
export interface Catalog {
  descriptor: {
    name: string;
    code?: string;
  };
  providers: Provider[];
}

/**
 * Interface for a provider, which includes an ID, a descriptor, optional categories, locations, fulfillments, and a list of items.
 */
export interface Provider {
  id: string;
  descriptor: {
    name: string;
    short_desc: string;
    images: Image[];
  };
  categories?: Category[];
  locations?: Location[];
  fulfillments?: Fulfillment[];
  items: Item[];
}

/**
 * Interface for an image, which includes a URL.
 */
interface Image {
  url: string;
}

/**
 * Interface for a category, which includes an ID and a descriptor.
 */
interface Category {
  id: string;
  descriptor: {
    code: string;
    name: string;
  };
}

/**
 * Interface for a location, which includes an ID, an optional city, and an optional state.
 */
interface Location {
  id: string;
  city?: {
    name: string;
    code: string;
  };
  state?: {
    name: string;
    code: string;
  };
}

/**
 * Interface for a fulfillment, which includes an ID, a type, optional tracking, and optional contact information.
 */
interface Fulfillment {
  id: string;
  type: string;
  tracking?: boolean;
  contact?: {
    phone: string;
    email: string;
  };
}

/**
 * Interface for an item, which includes an ID, a descriptor, price details, optional quantity, a rating, rateability, time details, fulfillments, tags, category IDs, fulfillment IDs, and location IDs.
 */
interface Item {
  id: string;
  descriptor: {
    name: string;
    long_desc: string;
  };
  price: {
    currency: string;
    value: string;
  };
  quantity?: {
    maximum?: {
      count: string;
    };
    minimum?: {
      count: string;
    };
  };
  rating: string;
  rateable: boolean;
  time: {
    label: string;
    range: {
      start: string;
      end: string;
    };
  };
  fulfillments: Fulfillment[];
  tags: Tag[];
  category_ids: string[];
  fulfillment_ids: string[];
  location_ids: string[];
}

/**
 * Interface for a tag, which includes a display flag, a descriptor, and a list of lists.
 */
interface Tag {
  display: boolean;
  descriptor: {
    code?: string;
    name: string;
  };
  list: List[];
}

/**
 * Interface for a list, which includes a descriptor and a value.
 */
interface List {
  descriptor: {
    code?: string;
    name: string;
  };
  value: string;
}

/**
 * Interface for a message response, which includes a catalog.
 */
export interface MessageResponse {
  message: {
    catalog: Catalog;
  };
}
