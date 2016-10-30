exports.populateRandomMongo = function(count,options) {
	var MongoClient = require('mongodb').MongoClient;
	var loremIpsum = require('lorem-ipsum');

	function populateRandomMongo(count,options) {
		var count = count || 100,
			options = options || {db:'test',coll:'RandomData'},
			records = generateRandomDataRecords(count),
			start = new Date();

		var theInsert = MongoClient.connect("mongodb://127.0.0.1:27017/" + options.db, function(err, db) {
		    // Get the collection
		    var col = db.collection(options.coll);

		    // Initialize the Ordered Batch
		    // You can use initializeUnorderedBulkOp to initialize Unordered Batch
		    var batch = col.initializeOrderedBulkOp();

			for (var i in records) {
				batch.insert(records[i]);
				var current = Math.floor(parseInt(i) + 1);
				process.stdout.clearLine();
				process.stdout.cursorTo(0);
				process.stdout.write('Done with: ' + current);
			}

		    // Execute the operations
		    batch.execute(function(err, result) {
		      db.close();
				var end = new Date();
				process.stdout.clearLine();
				process.stdout.cursorTo(0);
				process.stdout.write('Completed in: ' + (end - start));
				console.log('Done');
		    });
		});
	}

	function generateRandomDataRecords(count){
		var count = count || 100,
			theRecords = [];
		for(var i = 1; i <= count; i++){
			theRecords.push(generateRandomDataRecord(i));
			process.stdout.clearLine();
			process.stdout.cursorTo(0);
			process.stdout.write('Processed: ' + i);
		}
		return theRecords;
	}

	function generateRandomDataRecord(index) {
		var index = index || 1,
			record = {};
		for (var i in Fields) {
			record[i] = generateRandomDataValue(Fields[i]);
		}
		return record;
	}

	function generateRandomDataValue(format){
		/*Boolean
		Date
		Number
		Simple Data Type
		String
		String List, Multi
		String List, Single
		Timestamp*/

		var format = format || 'string';
		switch(format) {
			case 'Date':
				return randomDate(new Date(2012, 0, 1), new Date());
				break;
			case 'Number':
				return randomNumber();
				break;
			case 'Timestamp':
				return randomDate(new Date(2012, 0, 1), new Date());
				break;
			default:
				return randomString();
		}
	}

	function randomDate(start, end) {
	    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
	}

	function randomNumber() {
		return Math.floor((Math.random() * 100) + 1);
	}

	function randomString() {
		var randomNumber = Math.floor((Math.random()*5)+1);
		var str = loremIpsum({
			count:randomNumber,
			units:'words'
		});
		return str;

		var alphabet = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z, ,.,!,$,%',
			str = '';
		for (var i = 0; i < Math.floor((Math.random()*1000)+1); i++){
			str += alphabet.split(',')[ Math.floor(Math.random() * alphabet.split(',').length) + 1 ];
		}
		return str;
	}

	var Fields = {
		"ListingKey": "String",
		"ListingId": "String",
		"ListAOR": "String List, Single",
		"OriginatingSystemKey": "String",
		"OriginatingSystemName": "String",
		"ListingService": "String List, Single",
		"ListingAgreement": "String List, Single",
		"LeaseConsideredYN": "Boolean",
		"HomeWarrantyYN": "Boolean",
		"CopyrightNotice": "String",
		"Disclaimer": "String",
		"StandardStatus": "String List, Single",
		"MlsStatus": "String",
		"ApprovalStatus": "String List, Single",
		"ListingContractDate": "Date",
		"ContractStatusChangeDate": "Date",
		"ExpirationDate": "Date",
		"CancelationDate": "Date",
		"ContingentDate": "Date",
		"WithdrawnDate": "Date",
		"PurchaseContractDate": "Date",
		"CloseDate": "Date",
		"OnMarketDate": "Date",
		"OffMarketDate": "Date",
		"PendingTimestamp": "Timestamp",
		"ModificationTimestamp": "Timestamp",
		"StatusChangeTimestamp": "Timestamp",
		"PriceChangeTimestamp": "Timestamp",
		"MajorChangeType": "String List, Single",
		"MajorChangeTimestamp": "Timestamp",
		"OriginalEntryTimestamp": "Timestamp",
		"OnMarketTimestamp": "Timestamp",
		"OffMarketTimestamp": "Timestamp",
		"DaysOnMarket": "Number",
		"CumulativeDaysOnMarket": "Number",
		"ClosePrice": "Number",
		"ListPrice": "Number",
		"OriginalListPrice": "Number",
		"ListPriceLow": "Number",
		"PreviousListPrice": "Number",
		"BuyerAgencyCompensation": "String",
		"BuyerAgencyCompensationType": "String List, Single",
		"SubAgencyCompensation": "String",
		"SubAgencyCompensationType": "String List, Single",
		"TransactionBrokerCompensation": "String",
		"TransactionBrokerCompensationType": "String List, Single",
		"DualVariableCompensationYN": "Boolean",
		"LeaseRenewalCompensation": "String List, Multi",
		"SignOnPropertyYN": "Boolean",
		"InternetEntireListingDisplayYN": "Boolean",
		"InternetAddressDisplayYN": "Boolean",
		"InternetConsumerCommentYN": "Boolean",
		"InternetAutomatedValuationDisplayYN": "Boolean",
		"SyndicateTo": "String List, Multi",
		"PhotosCount": "Number",
		"PhotosChangeTimestamp": "Timestamp",
		"VideosCount": "Number",
		"VideosChangeTimestamp": "Timestamp",
		"DocumentsCount": "Number",
		"DocumentsChangeTimestamp": "Timestamp",
		"DocumentsAvailable": "String List, Multi",
		"VirtualTourURLUnbranded": "String",
		"VirtualTourURLBranded": "String",
		"PublicRemarks": "String",
		"SyndicationRemarks": "String",
		"PrivateRemarks": "String",
		"PrivateOfficeRemarks": "String",
		"ShowingInstructions": "String",
		"ShowingContactPhone": "String",
		"ShowingContactPhoneExt": "String",
		"ShowingContactName": "String",
		"ShowingContactType": "String List, Multi",
		"LockBoxLocation": "String",
		"LockBoxType": "String List, Multi",
		"LockBoxSerialNumber": "String",
		"AccessCode": "String",
		"Exclusions": "String",
		"Inclusions": "String",
		"Disclosures": "String List, Multi",
		"Ownership": "String",
		"SpecialListingConditions": "String List, Multi",
		"ListingTerms": "String List, Multi",
		"CurrentFinancing": "String List, Multi",
		"BuyerFinancing": "String List, Multi",
		"Concessions": "String List, Single",
		"ConcessionsComments": "String",
		"ConcessionsAmount": "Number",
		"Contingency": "String",
		"Possession": "String List, Multi",
		"AvailabilityDate": "Date",
		"StreetNumber": "String",
		"StreetNumberNumeric": "Number",
		"StreetDirPrefix": "String",
		"StreetName": "String",
		"StreetAdditionalInfo": "String",
		"StreetSuffix": "String List, Single",
		"StreetSuffixModifier": "String",
		"StreetDirSuffix": "String",
		"UnitNumber": "String",
		"City": "String List, Single",
		"StateOrProvince": "String List, Single",
		"Country": "String List, Single",
		"PostalCode": "String",
		"PostalCodePlus4": "String",
		"CarrierRoute": "String",
		"UnparsedAddress": "String",
		"PostalCity": "String List, Single",
		"CountyOrParish": "String List, Single",
		"Township": "String",
		"MLSAreaMajor": "String List, Single",
		"MLSAreaMinor": "String List, Single",
		"SubdivisionName": "String",
		"Latitude": "Number",
		"Longitude": "Number",
		"Elevation": "Number",
		"ElevationUnits": "String List, Single",
		"Directions": "String",
		"MapCoordinate": "String",
		"MapCoordinateSource": "String",
		"MapURL": "String",
		"CrossStreet": "String",
		"ElementarySchool": "String List, Single",
		"ElementarySchoolDistrict": "String List, Single",
		"MiddleOrJuniorSchool": "String List, Single",
		"MiddleOrJuniorSchoolDistrict": "String List, Single",
		"HighSchool": "String List, Single",
		"HighSchoolDistrict": "String List, Single",
		"ListAgentNamePrefix": "String",
		"ListAgentFirstName": "String",
		"ListAgentMiddleName": "String",
		"ListAgentLastName": "String",
		"ListAgentNameSuffix": "String",
		"ListAgentFullName": "String",
		"ListAgentPreferredPhone": "String",
		"ListAgentPreferredPhoneExt": "String",
		"ListAgentOfficePhone": "String",
		"ListAgentOfficePhoneExt": "String",
		"ListAgentCellPhone": "String",
		"ListAgentDirectPhone": "String",
		"ListAgentHomePhone": "String",
		"ListAgentFax": "String",
		"ListAgentPager": "String",
		"ListAgentVoiceMail": "String",
		"ListAgentVoiceMailExt": "String",
		"ListAgentTollFreePhone": "String",
		"ListAgentEmail": "String",
		"ListAgentURL": "String",
		"ListAgentKey": "String",
		"ListAgentAOR": "String List, Single",
		"ListAgentMlsId": "String",
		"ListAgentStateLicense": "String",
		"ListAgentDesignation": "String List, Multi",
		"ListOfficeName": "String",
		"ListOfficePhone": "String",
		"ListOfficePhoneExt": "String",
		"ListOfficeFax": "String",
		"ListOfficeEmail": "String",
		"ListOfficeURL": "String",
		"ListOfficeKey": "String",
		"ListOfficeAOR": "String List, Single",
		"ListOfficeMlsId": "String",
		"CoListAgentNamePrefix": "String",
		"CoListAgentFirstName": "String",
		"CoListAgentMiddleName": "String",
		"CoListAgentLastName": "String",
		"CoListAgentNameSuffix": "String",
		"CoListAgentFullName": "String",
		"CoListAgentPreferredPhone": "String",
		"CoListAgentPreferredPhoneExt": "String",
		"CoListAgentOfficePhone": "String",
		"CoListAgentOfficePhoneExt": "String",
		"CoListAgentCellPhone": "String",
		"CoListAgentDirectPhone": "String",
		"CoListAgentHomePhone": "String",
		"CoListAgentFax": "String",
		"CoListAgentPager": "String",
		"CoListAgentVoiceMail": "String",
		"CoListAgentVoiceMailExt": "String",
		"CoListAgentTollFreePhone": "String",
		"CoListAgentEmail": "String",
		"CoListAgentURL": "String",
		"CoListAgentKey": "String",
		"CoListAgentAOR": "String List, Single",
		"CoListAgentMlsId": "String",
		"CoListAgentStateLicense": "String",
		"CoListAgentDesignation": "String List, Multi",
		"CoListOfficeName": "String",
		"CoListOfficePhone": "String",
		"CoListOfficePhoneExt": "String",
		"CoListOfficeFax": "String",
		"CoListOfficeEmail": "String",
		"CoListOfficeURL": "String",
		"CoListOfficeKey": "String",
		"CoListOfficeAOR": "String List, Single",
		"CoListOfficeMlsId": "String",
		"BuyerAgentNamePrefix": "String",
		"BuyerAgentFirstName": "String",
		"BuyerAgentMiddleName": "String",
		"BuyerAgentLastName": "String",
		"BuyerAgentNameSuffix": "String",
		"BuyerAgentFullName": "String",
		"BuyerAgentPreferredPhone": "String",
		"BuyerAgentPreferredPhoneExt": "String",
		"BuyerAgentOfficePhone": "String",
		"BuyerAgentOfficePhoneExt": "String",
		"BuyerAgentCellPhone": "String",
		"BuyerAgentDirectPhone": "String",
		"BuyerAgentHomePhone": "String",
		"BuyerAgentFax": "String",
		"BuyerAgentPager": "String",
		"BuyerAgentVoiceMail": "String",
		"BuyerAgentVoiceMailExt": "String",
		"BuyerAgentTollFreePhone": "String",
		"BuyerAgentEmail": "String",
		"BuyerAgentURL": "String",
		"BuyerAgentKey": "String",
		"BuyerAgentAOR": "String List, Single",
		"BuyerAgentMlsId": "String",
		"BuyerAgentStateLicense": "String",
		"BuyerAgentDesignation": "String List, Multi",
		"BuyerOfficeName": "String",
		"BuyerOfficePhone": "String",
		"BuyerOfficePhoneExt": "String",
		"BuyerOfficeFax": "String",
		"BuyerOfficeEmail": "String",
		"BuyerOfficeURL": "String",
		"BuyerOfficeKey": "String",
		"BuyerOfficeAOR": "String List, Single",
		"BuyerOfficeMlsId": "String",
		"CoBuyerAgentNamePrefix": "String",
		"CoBuyerAgentFirstName": "String",
		"CoBuyerAgentMiddleName": "String",
		"CoBuyerAgentLastName": "String",
		"CoBuyerAgentNameSuffix": "String",
		"CoBuyerAgentFullName": "String",
		"CoBuyerAgentPreferredPhone": "String",
		"CoBuyerAgentPreferredPhoneExt": "String",
		"CoBuyerAgentOfficePhone": "String",
		"CoBuyerAgentOfficePhoneExt": "String",
		"CoBuyerAgentCellPhone": "String",
		"CoBuyerAgentDirectPhone": "String",
		"CoBuyerAgentHomePhone": "String",
		"CoBuyerAgentFax": "String",
		"CoBuyerAgentPager": "String",
		"CoBuyerAgentVoiceMail": "String",
		"CoBuyerAgentVoiceMailExt": "String",
		"CoBuyerAgentTollFreePhone": "String",
		"CoBuyerAgentEmail": "String",
		"CoBuyerAgentURL": "String",
		"CoBuyerAgentKey": "String",
		"CoBuyerAgentAOR": "String List, Single",
		"CoBuyerAgentMlsId": "String",
		"CoBuyerAgentStateLicense": "String",
		"CoBuyerAgentDesignation": "String List, Multi",
		"CoBuyerOfficeName": "String",
		"CoBuyerOfficePhone": "String",
		"CoBuyerOfficePhoneExt": "String",
		"CoBuyerOfficeFax": "String",
		"CoBuyerOfficeEmail": "String",
		"CoBuyerOfficeURL": "String",
		"CoBuyerOfficeKey": "String",
		"CoBuyerOfficeAOR": "String List, Single",
		"CoBuyerOfficeMlsId": "String",
		"ListTeamName": "String",
		"ListTeamKey": "String",
		"BuyerTeamName": "String",
		"BuyerTeamKey": "String",
		"PropertyType": "String List, Single",
		"PropertySubType": "String List, Single",
		"AssociationYN": "Boolean",
		"AssociationName": "String",
		"AssociationPhone": "String",
		"AssociationFee": "Number",
		"AssociationFeeFrequency": "String List, Single",
		"AssociationName2": "String",
		"AssociationPhone2": "String",
		"AssociationFee2": "Number",
		"AssociationFee2Frequency": "String List, Single",
		"AssociationFeeIncludes": "String List, Multi",
		"AssociationAmenities": "String List, Multi",
		"PetsAllowed": "String List, Multi",
		"LotSizeArea": "Number",
		"LotSizeSource": "String List, Single",
		"LotSizeUnits": "String List, Single",
		"LotSizeDimensions": "String",
		"LotDimensionsSource": "String List, Single",
		"LotSizeAcres": "Number",
		"LotSizeSquareFeet": "Number",
		"FrontageType": "String List, Multi",
		"FrontageLength": "String",
		"RoadFrontageType": "String List, Multi",
		"RoadSurfaceType": "String List, Multi",
		"RoadResponsibility": "String List, Multi",
		"OccupantName": "String",
		"OccupantPhone": "String",
		"OccupantType": "String List, Single",
		"OwnerName": "String",
		"OwnerPhone": "String",
		"AnchorsCoTenants": "String",
		"LeaseTerm": "String List, Single",
		"LandLeaseYN": "Boolean",
		"LandLeaseAmount": "Number",
		"LandLeaseAmountFrequency": "String List, Single",
		"LandLeaseExpirationDate": "Date",
		"View": "String List, Multi",
		"ViewYN": "Boolean",
		"LotFeatures": "String List, Multi",
		"CurrentUse": "String List, Multi",
		"PossibleUse": "String List, Multi",
		"DevelopmentStatus": "String List, Multi",
		"NumberOfLots": "Number",
		"Topography": "String",
		"HorseYN": "Boolean",
		"HorseAmenities": "String List, Multi",
		"CommunityFeatures": "String List, Multi",
		"SeniorCommunityYN": "Boolean",
		"PoolFeatures": "String List, Multi",
		"PoolPrivateYN": "Boolean",
		"SpaFeatures": "String List, Multi",
		"SpaYN": "Boolean",
		"WaterfrontYN": "Boolean",
		"WaterfrontFeatures": "String List, Multi",
		"WaterBodyName": "String",
		"GrossScheduledIncome": "Number",
		"GrossIncome": "Number",
		"IncomeIncludes": "String List, Multi",
		"OperatingExpense": "Number",
		"OperatingExpenseIncludes": "String List, Multi",
		"NetOperatingIncome": "Number",
		"CapRate": "Number",
		"NumberOfUnitsLeased": "Number",
		"NumberOfUnitsMoMo": "Number",
		"NumberOfUnitsVacant": "Number",
		"ExistingLeaseType": "String List, Multi",
		"UnitsFurnished": "String List, Single",
		"TotalActualRent": "Number",
		"RentControlYN": "Boolean",
		"NumberOfUnitsTotal": "Number",
		"NumberOfBuildings": "Number",
		"OwnerPays": "String List, Multi",
		"TenantPays": "String List, Multi",
		"VacancyAllowance": "Number",
		"VacancyAllowanceRate": "Number",
		"CableTvExpense": "Number",
		"ElectricExpense": "Number",
		"GardnerExpense": "Number",
		"FurnitureReplacementExpense": "Number",
		"FuelExpense": "Number",
		"InsuranceExpense": "Number",
		"OtherExpense": "Number",
		"LicensesExpense": "Number",
		"MaintenanceExpense": "Number",
		"NewTaxesExpense": "Number",
		"PestControlExpense": "Number",
		"PoolExpense": "Number",
		"SuppliesExpense": "Number",
		"TrashExpense": "Number",
		"WaterSewerExpense": "Number",
		"WorkmansCompensationExpense": "Number",
		"ProfessionalManagementExpense": "Number",
		"ManagerExpense": "Number",
		"FinancialDataSource": "String List, Multi",
		"RentIncludes": "String List, Multi",
		"Furnished": "String List, Single",
		"BusinessName": "String",
		"BusinessType": "String List, Multi",
		"OwnershipType": "String List, Single",
		"SpecialLicenses": "String List, Multi",
		"NumberOfFullTimeEmployees": "Number",
		"NumberOfPartTimeEmployees": "Number",
		"LeaseAmount": "Number",
		"LeaseAmountFrequency": "String List, Single",
		"LeaseExpiration": "Date",
		"LeaseRenewalOptionYN": "Boolean",
		"LeaseAssignableYN": "Boolean",
		"HoursDaysofOperation": "String List, Multi",
		"HoursDaysofOperationDescription": "String",
		"YearEstablished": "Number",
		"SeatingCapacity": "Number",
		"YearsCurrentOwner": "Number",
		"LaborInformation": "String List, Multi",
		"Utilities": "String List, Multi",
		"Electric": "String List, Multi",
		"Gas": "String List, Multi",
		"Telephone": "String List, Multi",
		"IrrigationWaterRightsYN": "Boolean",
		"IrrigationWaterRightsAcres": "Number",
		"IrrigationSource": "String List, Multi",
		"WaterSource": "String List, Multi",
		"DistanceToWater": "String",
		"ElectricOnPropertyYN": "Boolean",
		"DistanceToElectric": "String",
		"Sewer": "String List, Multi",
		"DistanceToSewer": "String",
		"DistanceToGas": "String",
		"DistanceToPhoneService": "String",
		"DistanceToStreet": "String",
		"DistanceToSchools": "String",
		"DistanceFromShopping": "String",
		"DistanceToPlaceofWorship": "String",
		"DistanceToBus": "String",
		"DistanceFromSchoolBus": "String",
		"DistanceToFreeway": "String",
		"CropsIncludedYN": "Boolean",
		"GrazingPermitsBlmYN": "Boolean",
		"GrazingPermitsForestServiceYN": "Boolean",
		"GrazingPermitsPrivateYN": "Boolean",
		"CultivatedArea": "Number",
		"PastureArea": "Number",
		"RangeArea": "Number",
		"WoodedArea": "Number",
		"Vegetation": "String List, Multi",
		"Fencing": "String List, Multi",
		"FarmCreditServiceInclYN": "Boolean",
		"FarmLandAreaUnits": "String List, Single",
		"FarmLandAreaSource": "String List, Single",
		"BedroomsTotal": "Number",
		"BedroomsPossible": "Number",
		"MainLevelBedrooms": "Number",
		"BathroomsTotalInteger": "Number",
		"BathroomsFull": "Number",
		"BathroomsHalf": "Number",
		"BathroomsThreeQuarter": "Number",
		"BathroomsOneQuarter": "Number",
		"BathroomsPartial": "Number",
		"MainLevelBathrooms": "Number",
		"LivingArea": "Number",
		"LivingAreaUnits": "String List, Single",
		"PropertyAttachedYN": "Boolean",
		"GarageYN": "Boolean",
		"GarageSpaces": "Number",
		"StoriesTotal": "Number",
		"Stories": "Number",
		"Levels": "String List, Multi",
		"YearBuilt": "Number",
		"MobileLength": "Number",
		"MobileWidth": "Number",
		"Make": "String",
		"Model": "String",
		"ParcelNumber": "String",
		"LivingAreaSource": "String List, Single",
		"AboveGradeFinishedArea": "Number",
		"AboveGradeFinishedAreaSource": "String List, Single",
		"AboveGradeFinishedAreaUnits": "String List, Single",
		"BelowGradeFinishedArea": "Number",
		"BelowGradeFinishedAreaSource": "String List, Single",
		"BelowGradeFinishedAreaUnits": "String List, Single",
		"BuildingAreaTotal": "Number",
		"BuildingAreaSource": "String List, Single",
		"BuildingAreaUnits": "String List, Single",
		"LeasableArea": "Number",
		"LeasableAreaUnits": "String List, Single",
		"CommonWalls": "String List, Multi",
		"FoundationArea": "Number",
		"AttachedGarageYN": "Boolean",
		"CarportSpaces": "Number",
		"CarportYN": "Boolean",
		"OpenParkingYN": "Boolean",
		"OpenParkingSpaces": "Number",
		"CoveredSpaces": "Number",
		"ParkingFeatures": "String List, Multi",
		"OtherParking": "String",
		"ParkingTotal": "Number",
		"RVParkingDimensions": "String",
		"EntryLocation": "String",
		"EntryLevel": "Number",
		"YearBuiltEffective": "Number",
		"YearBuiltDetails": "String",
		"YearBuiltSource": "String List, Single",
		"NewConstructionYN": "Boolean",
		"GreenBuildingVerificationType": "String List, Multi",
		"GreenVerification[Type]Body": "String",
		"GreenVerification[Type]Year": "Number",
		"GreenVerification[Type]Rating": "String",
		"GreenVerification[Type]Metric": "Number",
		"GreenVerification[Type]URL": "String",
		"BuilderName": "String",
		"BuilderModel": "String",
		"BuildingName": "String",
		"BuildingFeatures": "String List, Multi",
		"Heating": "String List, Multi",
		"HeatingYN": "Boolean",
		"Cooling": "String List, Multi",
		"CoolingYN": "Boolean",
		"InteriorFeatures": "String List, Multi",
		"ExteriorFeatures": "String List, Multi",
		"PatioAndPorchFeatures": "String List, Multi",
		"ArchitecturalStyle": "String List, Multi",
		"PropertyCondition": "String List, Multi",
		"FireplaceFeatures": "String List, Multi",
		"FireplacesTotal": "Number",
		"FireplaceYN": "Boolean",
		"DoorFeatures": "String List, Multi",
		"WindowFeatures": "String List, Multi",
		"Roof": "String List, Multi",
		"ConstructionMaterials": "String List, Multi",
		"FoundationDetails": "String List, Multi",
		"Basement": "String List, Multi",
		"Flooring": "String List, Multi",
		"OtherStructures": "String List, Multi",
		"DirectionFaces": "String List, Single",
		"OtherEquipment": "String List, Multi",
		"Appliances": "String List, Multi",
		"LaundryFeatures": "String List, Multi",
		"SecurityFeatures": "String List, Multi",
		"NumberOfSeparateElectricMeters": "Number",
		"NumberOfSeparateGasMeters": "Number",
		"NumberOfSeparateWaterMeters": "Number",
		"GreenEnergyEfficient": "String List, Multi",
		"GreenEnergyGeneration": "String List, Multi",
		"GreenSustainability": "String List, Multi",
		"GreenWaterConservation": "String List, Multi",
		"GreenIndoorAirQuality": "String List, Multi",
		"GreenLocation": "String List, Multi",
		"WalkScore": "Number",
		"HabitableResidenceYN": "Boolean",
		"BodyType": "String List, Multi",
		"Skirt": "String List, Multi",
		"MobileDimUnits": "String List, Single",
		"ParkName": "String",
		"ParkManagerName": "String",
		"ParkManagerPhone": "String",
		"MobileHomeRemainsYN": "Boolean",
		"NumberOfPads": "Number",
		"SerialU": "String",
		"DOH1": "String",
		"License1": "String",
		"SerialX": "String",
		"DOH2": "String",
		"License2": "String",
		"SerialXX": "String",
		"DOH3": "String",
		"License3": "String",
		"AccessibilityFeatures": "String List, Multi",
		"RoomsTotal": "Number",
		"RoomType": "String List, Multi",
		"Room[type]Area": "Number",
		"Room[type]AreaUnits": "String List, Single",
		"Room[type]AreaSource": "String List, Single",
		"Room[type]Dimensions": "String",
		"Room[type]Length": "Number",
		"Room[type]Width": "Number",
		"Room[type]LengthWidthUnits": "String List, Single",
		"Room[type]LengthWidthSource": "String List, Single",
		"Room[type]Level": "String List, Single",
		"Room[type]Features": "String List, Multi",
		"Room[type]Description": "String",
		"UnitTypeType": "String List, Multi",
		"UnitType[type]UnitsTotal": "Number",
		"UnitType[type]BedsTotal": "Number",
		"UnitType[type]BathsTotal": "Number",
		"UnitType[type]Furnished": "String List, Single",
		"UnitType[type]Description": "String",
		"UnitType[type]GarageSpaces": "Number",
		"UnitType[type]GarageAttachedYN": "Boolean",
		"UnitType[type]ActualRent": "Number",
		"UnitType[type]TotalRent": "Number",
		"UnitType[type]ProForma": "Number",
		"Zoning": "String",
		"ZoningDescription": "String",
		"AdditionalParcelsYN": "Boolean",
		"AdditionalParcelsDescription": "String",
		"PublicSurveySection": "String",
		"PublicSurveyTownship": "String",
		"PublicSurveyRange": "String",
		"TaxLot": "String",
		"TaxBlock": "String",
		"TaxTract": "String",
		"TaxLegalDescription": "String",
		"TaxAnnualAmount": "Number",
		"TaxYear": "Number",
		"TaxAssessedValue": "Number",
		"TaxExemptions": "String List, Multi",
		"TaxOtherAnnualAssessmentAmount": "Number",
		"TaxBookNumber": "String",
		"TaxMapNumber": "String",
		"TaxParcelLetter": "String",
		"TaxStatusCurrent": "String List, Multi"
	}
	return populateRandomMongo(count,options);
}