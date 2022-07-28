import moment from 'moment';
import { Shipment, STATUS, SHIPMENT_ACTIVITY, SHIPMENT_TYPE, PACKAGE_TYPE, SCHEDULING_TYPE, SERVICE_TYPE } from '@voyage-app/shared-types';
import { customAlphabet } from 'nanoid'
import { Driver, DRIVER_STATUS } from './types'
import { alphanumericId } from '@voyage-app/shared-utils'

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzACBCDEFGHIJKLMNOPQRSTUVWXYZ1234567890')

export const PUBLIC_PATHS = {
	LOGIN: '/login'
};

export const PATHS = {
	HOME: '/',
	MARKETPLACE: '/marketplace',
	FLEETS: '/fleets',
	ACCOUNTS: '/accounts',
	REPORTING: '/report',
	SETTINGS: '/settings',
	TRIPS: '/trips',
	BOOK: '/trips/book',
	DRIVERS: '/fleets/drivers',
	TEAM: '/fleets/team',
	VEHICLES: '/fleets/vehicles',
	CUSTOMERS: '/accounts#customers',
	PAYMENTS: '/accounts#payments',
	INVOICE: '/accounts#invoice',
	BASIC_REPORT: '/report#basic',
	FUEL_REPORT: '/report#fuel'
};

const pickupFacilityId = `facility_${nanoid(24)}`
const deliveryFacilityId = `facility_${nanoid(24)}`

export const SAMPLE_LOADS: Shipment[] = [
	{
		id: '',
		source: 'Voyage',
		shipmentId: 'VOY-ID123',
		createdAt: moment().unix(),
		bookingStatus: 'Booked',
		status: STATUS.PENDING,
		serviceType: SERVICE_TYPE.WAREHOUSE_TO_WAREHOUSE,
		shipmentType: SHIPMENT_TYPE.FULL_TRUCK_LOAD,
		schedulingType: SCHEDULING_TYPE.ONE_TIME,
		activitiesRequired: [SHIPMENT_ACTIVITY.TAIL_LIFT],
		internalPONumber: 'PO 931-977981-8760',
		customerPONumber: 'PO 931-977981-8760',
		rate: 550.21,
		package: {
			weight: 19000,
			quantity: 1,
			packageType: PACKAGE_TYPE.PALLET,
			description: '',
			dimensions: {
				length: 90,
				width: 10,
				height: 120
			}
		},
		controller: {
			name: 'Ola Oladapo',
			phone: '+447523958055'
		},
		carrier: {
			name: 'HBCS Logistics',
			driverName: 'Ben Award',
			driverPhone: '+447507210809',
			location: [-1.778197, 52.412811]
		},
		pickup: {
			facilityId: pickupFacilityId,
			facilityName: 'Moved HQ',
			location: 'Solihull, Birmingham',
			window: {
				start: moment().add(1, 'd').set('h', 8).unix(),
				end: moment().add(1, 'd').set('h', 9).unix()
			}
		},
		delivery: {
			facilityId: deliveryFacilityId,
			facilityName: 'Packfleet',
			location: 'South London',
			window: {
				start: moment().add(1, 'd').set('h', 18).unix(),
				end: moment().add(1, 'd').set('h', 20).unix()
			}
		}
	},
	{
		id: '',
		source: 'Voyage',
		shipmentId: 'VOY-ID124',
		createdAt: moment().unix(),
		bookingStatus: 'Booked',
		status: STATUS.DISPATCHED,
		serviceType: SERVICE_TYPE.DIRECT_TO_STORE_DISTRIBUTION,
		shipmentType: SHIPMENT_TYPE.FULL_TRUCK_LOAD,
		schedulingType: SCHEDULING_TYPE.ONE_TIME,
		activitiesRequired: [SHIPMENT_ACTIVITY.TAIL_LIFT],
		internalPONumber: 'PO 931-977981-8760',
		customerPONumber: 'PO 931-977981-8760',
		rate: 550.21,
		package: {
			weight: 14000,
			quantity: 1,
			packageType: PACKAGE_TYPE.PALLET,
			description: '',
			dimensions: {
				length: 90,
				width: 10,
				height: 120
			}
		},
		controller: {
			name: 'Chisom Oguibe',
			phone: '+447523958055'
		},
		carrier: {
			name: 'HBCS Logistics',
			driverName: 'Ben Award',
			driverPhone: '+447507210809',
			location: [-1.778197, 52.412811]
		},
		pickup: {
			facilityId: pickupFacilityId,
			facilityName: 'Moved HQ',
			location: 'Solihull, Birmingham',
			window: {
				start: moment().add(2, 'd').set('h', 8).unix(),
				end: moment().add(2, 'd').set('h', 9).unix()
			}
		},
		delivery: {
			facilityId: deliveryFacilityId,
			facilityName: 'Packfleet',
			location: 'South London',
			window: {
				start: moment().add(2, 'd').set('h', 18).unix(),
				end: moment().add(2, 'd').set('h', 20).unix()
			}
		}
	},
	{
		id: '',
		source: 'Voyage',
		shipmentId: 'VOY-ID125',
		createdAt: moment().unix(),
		bookingStatus: 'Booked',
		status: STATUS.EN_ROUTE,
		serviceType: SERVICE_TYPE.DIRECT_TO_STORE_DISTRIBUTION,
		shipmentType: SHIPMENT_TYPE.FULL_TRUCK_LOAD,
		schedulingType: SCHEDULING_TYPE.RECURRING,
		activitiesRequired: [SHIPMENT_ACTIVITY.TAIL_LIFT],
		internalPONumber: 'PO 931-977981-8760',
		customerPONumber: 'PO 931-977981-8760',
		rate: 550.21,
		package: {
			weight: 9000,
			quantity: 1,
			packageType: PACKAGE_TYPE.PALLET,
			description: '',
			dimensions: {
				length: 90,
				width: 10,
				height: 120
			}
		},
		controller: {
			name: 'Rayan Bannai',
			phone: '+447523958055'
		},
		carrier: {
			name: 'HBCS Logistics',
			driverName: 'Ben Award',
			driverPhone: '+447507210809',
			location: [-1.778197, 52.412811]
		},
		pickup: {
			facilityId: pickupFacilityId,
			facilityName: 'Moved HQ',
			location: 'Solihull, Birmingham',
			window: {
				start: moment().add(3, 'd').set('h', 8).unix(),
				end: moment().add(3, 'd').set('h', 9).unix()
			}
		},
		delivery: {
			facilityId: deliveryFacilityId,
			facilityName: 'Packfleet',
			location: 'South London',
			window: {
				start: moment().add(3, 'd').set('h', 18).unix(),
				end: moment().add(3, 'd').set('h', 20).unix()
			}
		}
	},
	{
		id: '',
		source: 'Voyage',
		shipmentId: 'VOY-ID127',
		createdAt: moment().unix(),
		bookingStatus: 'Booked',
		status: STATUS.CANCELLED,
		serviceType: SERVICE_TYPE.DIRECT_TO_STORE_DISTRIBUTION,
		shipmentType: SHIPMENT_TYPE.FULL_TRUCK_LOAD,
		schedulingType: SCHEDULING_TYPE.RECURRING,
		activitiesRequired: [SHIPMENT_ACTIVITY.TAIL_LIFT],
		internalPONumber: 'PO 931-977981-8760',
		customerPONumber: 'PO 931-977981-8760',
		rate: 550.21,
		package: {
			weight: 9000,
			quantity: 1,
			packageType: PACKAGE_TYPE.PALLET,
			description: '',
			dimensions: {
				length: 90,
				width: 10,
				height: 120
			}
		},
		controller: {
			name: 'Ola Oladapo',
			phone: '+447523958055'
		},
		carrier: {
			name: 'HBCS Logistics',
			driverName: 'Ben Award',
			driverPhone: '+447507210809',
			location: [-1.778197, 52.412811]
		},
		pickup: {
			facilityId: pickupFacilityId,
			facilityName: 'Moved HQ',
			location: 'Solihull, Birmingham',
			window: {
				start: moment().add(4, 'd').set('h', 8).unix(),
				end: moment().add(4, 'd').set('h', 9).unix()
			}
		},
		delivery: {
			facilityId: deliveryFacilityId,
			facilityName: 'Packfleet',
			location: 'South London',
			window: {
				start: moment().add(4, 'd').set('h', 18).unix(),
				end: moment().add(4, 'd').set('h', 20).unix()
			}
		}
	},
	{
		id: '',
		source: 'Voyage',
		shipmentId: 'VOY-ID128',
		createdAt: moment().unix(),
		bookingStatus: 'Booked',
		status: STATUS.DISPATCHED,
		serviceType: SERVICE_TYPE.DIRECT_TO_STORE_DISTRIBUTION,
		shipmentType: SHIPMENT_TYPE.FULL_TRUCK_LOAD,
		schedulingType: SCHEDULING_TYPE.ONE_TIME,
		activitiesRequired: [SHIPMENT_ACTIVITY.TAIL_LIFT],
		internalPONumber: 'PO 931-977981-8760',
		customerPONumber: 'PO 931-977981-8760',
		rate: 550.21,
		package: {
			weight: 9000,
			quantity: 1,
			packageType: PACKAGE_TYPE.PALLET,
			description: '',
			dimensions: {
				length: 90,
				width: 10,
				height: 120
			}
		},
		controller: {
			name: 'Ola Oladapo',
			phone: '+447523958055'
		},
		carrier: {
			name: 'HBCS Logistics',
			driverName: 'Ben Award',
			driverPhone: '+447507210809',
			location: [-1.778197, 52.412811]
		},
		pickup: {
			facilityId: pickupFacilityId,
			facilityName: 'Moved HQ',
			location: 'Solihull, Birmingham',
			window: {
				start: moment().add(5, 'd').set('h', 8).unix(),
				end: moment().add(5, 'd').set('h', 9).unix()
			}
		},
		delivery: {
			facilityId: deliveryFacilityId,
			facilityName: 'Packfleet',
			location: 'South London',
			window: {
				start: moment().add(5, 'd').set('h', 18).unix(),
				end: moment().add(5, 'd').set('h', 20).unix()
			}
		}
	},
	{
		id: '',
		source: 'Voyage',
		shipmentId: 'VOY-ID130',
		createdAt: moment().unix(),
		bookingStatus: 'Booked',
		status: STATUS.COMPLETED,
		serviceType: SERVICE_TYPE.WAREHOUSE_TO_WAREHOUSE,
		shipmentType: SHIPMENT_TYPE.LESS_THAN_PALLET_SIZE,
		schedulingType: SCHEDULING_TYPE.ONE_TIME,
		activitiesRequired: [SHIPMENT_ACTIVITY.TAIL_LIFT],
		internalPONumber: 'PO 931-977981-8760',
		customerPONumber: 'PO 931-977981-8760',
		rate: 550.21,
		package: {
			weight: 15000,
			quantity: 1,
			packageType: PACKAGE_TYPE.PALLET,
			description: '',
			dimensions: {
				length: 90,
				width: 10,
				height: 120
			}
		},
		controller: {
			name: 'Ola Oladapo',
			phone: '+447523958055'
		},
		carrier: {
			name: 'HBCS Logistics',
			driverName: 'Ben Award',
			driverPhone: '+447507210809',
			location: [-1.778197, 52.412811]
		},
		pickup: {
			facilityId: pickupFacilityId,
			facilityName: 'Moved HQ',
			location: 'Solihull, Birmingham',
			window: {
				start: moment().add(6, 'd').set('h', 8).unix(),
				end: moment().add(6, 'd').set('h', 9).unix()
			}
		},
		delivery: {
			facilityId: deliveryFacilityId,
			facilityName: 'Packfleet',
			location: 'South London',
			window: {
				start: moment().add(6, 'd').set('h', 18).unix(),
				end: moment().add(6, 'd').set('h', 20).unix()
			}
		}
	}
];

export const SAMPLE_DRIVERS: Driver[] = [
	{
		id: '',
		createdAt: moment().unix(),
		driverId: `driver_${alphanumericId(16)}`,
		status: DRIVER_STATUS.OFFLINE,
		isActive: false,
		firstname: 'Chisom',
		lastname: 'Oguibe',
		email: 'chisom.oguibe@googlemail.com',
		defaultPhone: '+447523958055',
		primaryPhone: '+447523958055',
		secondaryPhone: '+447507210809',
		dob: 884505600,
		addressLine1: '250 Reede Road',
		addressLine2: '',
		city: 'Dagenham',
		postcode: 'RM10 8EH',
		companyName: 'HBCS Logistics',
		hireDate: moment().unix(),
	},
	{
		id: '',
		createdAt: moment().unix(),
		driverId: `driver_${alphanumericId(16)}`,
		status: DRIVER_STATUS.OFFLINE,
		isActive: false,
		firstname: 'Ola',
		lastname: 'Oladapo',
		email: 'ola.oladapo7@gmail.com',
		defaultPhone: '+447523958055',
		primaryPhone: '+447523958055',
		secondaryPhone: '+447507210809',
		dob: 884505600,
		addressLine1: '250 Reede Road',
		addressLine2: '',
		city: 'Dagenham',
		postcode: 'RM10 8EH',
		companyName: 'HBCS Logistics',
		hireDate: moment().unix(),
	},
	{
		id: '',
		createdAt: moment().unix(),
		driverId: `driver_${alphanumericId(16)}`,
		status: DRIVER_STATUS.OFFLINE,
		isActive: false,
		firstname: 'Rayan',
		lastname: 'Bannai',
		email: 'rayan.bannai@googlemail.com',
		defaultPhone: '+447523958055',
		primaryPhone: '+447523958055',
		secondaryPhone: '+447507210809',
		dob: 884505600,
		addressLine1: '250 Reede Road',
		addressLine2: '',
		city: 'Dagenham',
		postcode: 'RM10 8EH',
		companyName: 'HBCS Logistics',
		hireDate: moment().unix(),
	},
	{
		id: '',
		createdAt: moment().unix(),
		driverId: `driver_${alphanumericId(16)}`,
		status: DRIVER_STATUS.OFFLINE,
		isActive: false,
		firstname: 'Oscar',
		lastname: 'Sanz',
		email: 'oscar_sanz@hotmail.com',
		defaultPhone: '+447523958055',
		primaryPhone: '+447523958055',
		secondaryPhone: '+447507210809',
		dob: 884505600,
		addressLine1: '250 Reede Road',
		addressLine2: '',
		city: 'Dagenham',
		postcode: 'RM10 8EH',
		companyName: 'HBCS Logistics',
		hireDate: moment().unix(),
	}
]