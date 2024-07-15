export default function getCompanies() {
  type Props = {
    value: String;
    label: String;
  };
  const companies = `3Com Corp
    3M Company
    A.G. Edwards Inc.
    Abbott Laboratories
    Abercrombie & Fitch Co.
    ABM Industries Incorporated
    Ace Hardware Corporation
    ACT Manufacturing Inc.
    Acterna Corp.
    Adams Resources & Energy, Inc.
    ADC Telecommunications, Inc.
    Adelphia Communications Corporation
    Administaff, Inc.
    Adobe Systems Incorporated
    Adolph Coors Company
    Advance Auto Parts, Inc.
    Advanced Micro Devices, Inc.
    AdvancePCS, Inc.
    Advantica Restaurant Group, Inc.
    The AES Corporation
    Aetna Inc.
    Affiliated Computer Services, Inc.
    AFLAC Incorporated
    AGCO Corporation
    Agilent Technologies, Inc.
    Agway Inc.
    Apartment Investment and Management Company
    Air Products and Chemicals, Inc.
    AirBnB, Inc.
    Airborne, Inc.
    Airgas, Inc.
    AK Steel Holding Corporation
    Alaska Air Group, Inc.
    Alberto-Culver Company
    Albertson's, Inc.
    Alcoa Inc.
    Alleghany Corporation
    Allegheny Energy, Inc.
    Allegheny Technologies Incorporated
    Allergan, Inc.
    ALLETE, Inc.
    Alliant Energy Corporation
    Allied Waste Industries, Inc.
    Allmerica Financial Corporation
    Alphabet, Inc.
    The Allstate Corporation
    ALLTEL Corporation
    The Alpine Group, Inc.
    Amazon.com, Inc.
    AMC Entertainment Inc.
    American Power Conversion Corporation
    Amerada Hess Corporation
    AMERCO
    Ameren Corporation
    America West Holdings Corporation
    American Axle & Manufacturing Holdings, Inc.
    American Eagle Outfitters, Inc.
    American Electric Power Company, Inc.
    American Express Company
    American Financial Group, Inc.
    American Greetings Corporation
    American International Group, Inc.
    American Standard Companies Inc.
    American Water Works Company, Inc.
    AmerisourceBergen Corporation
    Ames Department Stores, Inc.
    Amgen Inc.
    Amkor Technology, Inc.
    AMR Corporation
    AmSouth Bancorp.
    Amtran, Inc.
    Anadarko Petroleum Corporation
    Analog Devices, Inc.
    Anheuser-Busch Companies, Inc.
    Anixter International Inc.
    AnnTaylor Inc.
    Anthem, Inc.
    AOL Time Warner Inc.
    Aon Corporation
    Apache Corporation
    Apple Computer, Inc.
    Applera Corporation
    Applied Industrial Technologies, Inc.
    Applied Materials, Inc.
    Aquila, Inc.
    ARAMARK Corporation
    Arch Coal, Inc.
    Archer Daniels Midland Company
    Arkansas Best Corporation
    Armstrong Holdings, Inc.
    Arrow Electronics, Inc.
    ArvinMeritor, Inc.
    Ashland Inc.
    Astoria Financial Corporation
    AT&T Corp.
    Atmel Corporation
    Atmos Energy Corporation
    Audiovox Corporation
    Autoliv, Inc.
    Automatic Data Processing, Inc.
    AutoNation, Inc.
    AutoZone, Inc.
    Avaya Inc.
    Avery Dennison Corporation
    Avista Corporation
    Avnet, Inc.
    Avon Products, Inc.
    Baker Hughes Incorporated
    Ball Corporation
    Bank of America Corporation
    The Bank of New York Company, Inc.
    Bank One Corporation
    Banknorth Group, Inc.
    Banta Corporation
    Barnes & Noble, Inc.
    Bausch & Lomb Incorporated
    Baxter International Inc.
    BB&T Corporation
    The Bear Stearns Companies Inc.
    Beazer Homes USA, Inc.
    Beckman Coulter, Inc.
    Becton, Dickinson and Company
    Bed Bath & Beyond Inc.
    Belk, Inc.
    Bell Microproducts Inc.
    BellSouth Corporation
    Belo Corp.
    Bemis Company, Inc.
    Benchmark Electronics, Inc.
    Berkshire Hathaway Inc.
    Best Buy Co., Inc.
    Bethlehem Steel Corporation
    Beverly Enterprises, Inc.
    Big Lots, Inc.
    BJ Services Company
    BJ's Wholesale Club, Inc.
    The Black & Decker Corporation
    Black Hills Corporation
    BMC Software, Inc.
    The Boeing Company
    Boise Cascade Corporation
    Borders Group, Inc.
    BorgWarner Inc.
    Boston Scientific Corporation
    Bowater Incorporated
    Briggs & Stratton Corporation
    Brightpoint, Inc.
    Brinker International, Inc.
    Bristol-Myers Squibb Company
    Broadwing, Inc.
    Brown Shoe Company, Inc.
    Brown-Forman Corporation
    Brunswick Corporation
    Budget Group, Inc.
    Burlington Coat Factory Warehouse Corporation
    Burlington Industries, Inc.
    Burlington Northern Santa Fe Corporation
    Burlington Resources Inc.
    C. H. Robinson Worldwide Inc.
    Cablevision Systems Corp
    Cabot Corp
    Cadence Design Systems, Inc.
    Calpine Corp.
    Campbell Soup Co.
    Capital One Financial Corp.
    Cardinal Health Inc.
    Caremark Rx Inc.
    Carlisle Cos. Inc.
    Carpenter Technology Corp.
    Casey's General Stores Inc.
    Caterpillar Inc.
    CBRL Group Inc.
    CDI Corp.
    CDW Computer Centers Inc.
    CellStar Corp.
    Cendant Corp
    Cenex Harvest States Cooperatives
    Centex Corp.
    CenturyTel Inc.
    Ceridian Corp.
    CH2M Hill Cos. Ltd.
    Champion Enterprises Inc.
    Charles Schwab Corp.
    Charming Shoppes Inc.
    Charter Communications Inc.
    Charter One Financial Inc.
    ChevronTexaco Corp.
    Chiquita Brands International Inc.
    Chubb Corp
    Ciena Corp.
    Cigna Corp
    Cincinnati Financial Corp.
    Cinergy Corp.
    Cintas Corp.
    Circuit City Stores Inc.
    Cisco Systems Inc.
    Citigroup, Inc
    Citizens Communications Co.
    CKE Restaurants Inc.
    Clear Channel Communications Inc.
    The Clorox Co.
    CMGI Inc.
    CMS Energy Corp.
    CNF Inc.
    Coca-Cola Co.
    Coca-Cola Enterprises Inc.
    Colgate-Palmolive Co.
    Collins & Aikman Corp.
    Comcast Corp.
    Comdisco Inc.
    Comerica Inc.
    Comfort Systems USA Inc.
    Commercial Metals Co.
    Community Health Systems Inc.
    Compass Bancshares Inc
    Computer Associates International Inc.
    Computer Sciences Corp.
    Compuware Corp.
    Comverse Technology Inc.
    ConAgra Foods Inc.
    Concord EFS Inc.
    Conectiv, Inc
    Conoco Inc
    Conseco Inc.
    Consolidated Freightways Corp.
    Consolidated Edison Inc.
    Constellation Brands Inc.
    Constellation Emergy Group Inc.
    Continental Airlines Inc.
    Convergys Corp.
    Cooper Cameron Corp.
    Cooper Industries Ltd.
    Cooper Tire & Rubber Co.
    Corn Products International Inc.
    Corning Inc.
    Costco Wholesale Corp.
    Countrywide Credit Industries Inc.
    Coventry Health Care Inc.
    Cox Communications Inc.
    Crane Co.
    Crompton Corp.
    Crown Cork & Seal Co. Inc.
    CSK Auto Corp.
    CSX Corp.
    Cummins Inc.
    CVS Corp.
    Cytec Industries Inc.
    D&K Healthcare Resources, Inc.
    D.R. Horton Inc.
    Dana Corporation
    Danaher Corporation
    Darden Restaurants Inc.
    DaVita Inc.
    Dean Foods Company
    Deere & Company
    Del Monte Foods Co
    Dell Computer Corporation
    Delphi Corp.
    Delta Air Lines Inc.
    Deluxe Corporation
    Devon Energy Corporation
    Di Giorgio Corporation
    Dial Corporation
    Diebold Incorporated
    Dillard's Inc.
    DIMON Incorporated
    Dole Food Company, Inc.
    Dollar General Corporation
    Dollar Tree Stores, Inc.
    Dominion Resources, Inc.
    Domino's Pizza LLC
    Dover Corporation, Inc.
    Dow Chemical Company
    Dow Jones & Company, Inc.
    DPL Inc.
    DQE Inc.
    Dreyer's Grand Ice Cream, Inc.
    DST Systems, Inc.
    DTE Energy Co.
    E.I. Du Pont de Nemours and Company
    Duke Energy Corp
    Dun & Bradstreet Inc.
    DURA Automotive Systems Inc.
    DynCorp
    Dynegy Inc.
    E*Trade Group, Inc.
    E.W. Scripps Company
    Earthlink, Inc.
    Eastman Chemical Company
    Eastman Kodak Company
    Eaton Corporation
    Echostar Communications Corporation
    Ecolab Inc.
    Edison International
    EGL Inc.
    El Paso Corporation
    Electronic Arts Inc.
    Electronic Data Systems Corp.
    Eli Lilly and Company
    EMC Corporation
    Emcor Group Inc.
    Emerson Electric Co.
    Encompass Services Corporation
    Energizer Holdings Inc.
    Energy East Corporation
    Engelhard Corporation
    Enron Corp.
    Entergy Corporation
    Enterprise Products Partners L.P.
    EOG Resources, Inc.
    Equifax Inc.
    Equitable Resources Inc.
    Equity Office Properties Trust
    Equity Residential Properties Trust
    Estee Lauder Companies Inc.
    Exelon Corporation
    Exide Technologies
    Expeditors International of Washington Inc.
    Express Scripts Inc.
    ExxonMobil Corporation
    Fairchild Semiconductor International Inc.
    Family Dollar Stores Inc.
    Farmland Industries Inc.
    Federal Mogul Corp.
    Federated Department Stores Inc.
    Federal Express Corp.
    Felcor Lodging Trust Inc.
    Ferro Corp.
    Fidelity National Financial Inc.
    Fifth Third Bancorp
    First American Financial Corp.
    First Data Corp.
    First National of Nebraska Inc.
    First Tennessee National Corp.
    FirstEnergy Corp.
    Fiserv Inc.
    Fisher Scientific International Inc.
    FleetBoston Financial Co.
    Fleetwood Enterprises Inc.
    Fleming Companies Inc.
    Flowers Foods Inc.
    Flowserv Corp
    Fluor Corp
    FMC Corp
    Foamex International Inc
    Foot Locker Inc
    Footstar Inc.
    Ford Motor Co
    Forest Laboratories Inc.
    Fortune Brands Inc.
    Foster Wheeler Ltd.
    FPL Group Inc.
    Franklin Resources Inc.
    Freeport McMoran Copper & Gold Inc.
    Frontier Oil Corp
    Furniture Brands International Inc.
    Gannett Co., Inc.
    Gap Inc.
    Gateway Inc.
    GATX Corporation
    Gemstar-TV Guide International Inc.
    GenCorp Inc.
    General Cable Corporation
    General Dynamics Corporation
    General Electric Company
    General Mills Inc
    General Motors Corporation
    Genesis Health Ventures Inc.
    Gentek Inc.
    Gentiva Health Services Inc.
    Genuine Parts Company
    Genuity Inc.
    Genzyme Corporation
    Georgia Gulf Corporation
    Georgia-Pacific Corporation
    Gillette Company
    Gold Kist Inc.
    Golden State Bancorp Inc.
    Golden West Financial Corporation
    Goldman Sachs Group Inc.
    Goodrich Corporation
    The Goodyear Tire & Rubber Company
    Granite Construction Incorporated
    Graybar Electric Company Inc.
    Great Lakes Chemical Corporation
    Great Plains Energy Inc.
    GreenPoint Financial Corp.
    Greif Bros. Corporation
    Grey Global Group Inc.
    Group 1 Automotive Inc.
    Guidant Corporation
    H&R Block Inc.
    H.B. Fuller Company
    H.J. Heinz Company
    Halliburton Co.
    Harley-Davidson Inc.
    Harman International Industries Inc.
    Harrah's Entertainment Inc.
    Harris Corp.
    Harsco Corp.
    Hartford Financial Services Group Inc.
    Hasbro Inc.
    Hawaiian Electric Industries Inc.
    HCA Inc.
    Health Management Associates Inc.
    Health Net Inc.
    Healthsouth Corp
    Henry Schein Inc.
    Hercules Inc.
    Herman Miller Inc.
    Hershey Foods Corp.
    Hewlett-Packard Company
    Hibernia Corp.
    Hillenbrand Industries Inc.
    Hilton Hotels Corp.
    Hollywood Entertainment Corp.
    Home Depot Inc.
    Hon Industries Inc.
    Honeywell International Inc.
    Hormel Foods Corp.
    Host Marriott Corp.
    Household International Corp.
    Hovnanian Enterprises Inc.
    Hub Group Inc.
    Hubbell Inc.
    Hughes Supply Inc.
    Humana Inc.
    Huntington Bancshares Inc.
    Idacorp Inc.
    IDT Corporation
    IKON Office Solutions Inc.
    Illinois Tool Works Inc.
    IMC Global Inc.
    Imperial Sugar Company
    IMS Health Inc.
    Ingles Market Inc
    Ingram Micro Inc.
    Insight Enterprises Inc.
    Integrated Electrical Services Inc.
    Intel Corporation
    International Paper Co.
    Interpublic Group of Companies Inc.
    Interstate Bakeries Corporation
    International Business Machines Corp.
    International Flavors & Fragrances Inc.
    International Multifoods Corporation
    Intuit Inc.
    IT Group Inc.
    ITT Industries Inc.
    Ivax Corp.
    J.B. Hunt Transport Services Inc.
    J.C. Penny Co.
    J.P. Morgan Chase & Co.
    Jabil Circuit Inc.
    Jack In The Box Inc.
    Jacobs Engineering Group Inc.
    JDS Uniphase Corp.
    Jefferson-Pilot Co.
    John Hancock Financial Services Inc.
    Johnson & Johnson
    Johnson Controls Inc.
    Jones Apparel Group Inc.
    KB Home
    Kellogg Company
    Kellwood Company
    Kelly Services Inc.
    Kemet Corp.
    Kennametal Inc.
    Kerr-McGee Corporation
    KeyCorp
    KeySpan Corp.
    Kimball International Inc.
    Kimberly-Clark Corporation
    Kindred Healthcare Inc.
    KLA-Tencor Corporation
    K-Mart Corp.
    Knight-Ridder Inc.
    Kohl's Corp.
    KPMG Consulting Inc.
    Kroger Co.
    L-3 Communications Holdings Inc.
    Laboratory Corporation of America Holdings
    Lam Research Corporation
    LandAmerica Financial Group Inc.
    Lands' End Inc.
    Landstar System Inc.
    La-Z-Boy Inc.
    Lear Corporation
    Legg Mason Inc.
    Leggett & Platt Inc.
    Lehman Brothers Holdings Inc.
    Lennar Corporation
    Lennox International Inc.
    Level 3 Communications Inc.
    Levi Strauss & Co.
    Lexmark International Inc.
    Limited Inc.
    Lincoln National Corporation
    Linens 'n Things Inc.
    Lithia Motors Inc.
    Liz Claiborne Inc.
    Lockheed Martin Corporation
    Loews Corporation
    Longs Drug Stores Corporation
    Louisiana-Pacific Corporation
    Lowe's Companies Inc.
    LSI Logic Corporation
    The LTV Corporation
    The Lubrizol Corporation
    Lucent Technologies Inc.
    Lyondell Chemical Company
    M & T Bank Corporation
    Magellan Health Services Inc.
    Mail-Well Inc.
    Mandalay Resort Group
    Manor Care Inc.
    Manpower Inc.
    Marathon Oil Corporation
    Mariner Health Care Inc.
    Markel Corporation
    Marriott International Inc.
    Marsh & McLennan Companies Inc.
    Marsh Supermarkets Inc.
    Marshall & Ilsley Corporation
    Martin Marietta Materials Inc.
    Masco Corporation
    Massey Energy Company
    MasTec Inc.
    Mattel Inc.
    Maxim Integrated Products Inc.
    Maxtor Corporation
    Maxxam Inc.
    The May Department Stores Company
    Maytag Corporation
    MBNA Corporation
    McCormick & Company Incorporated
    McDonald's Corporation
    The McGraw-Hill Companies Inc.
    McKesson Corporation
    McLeodUSA Incorporated
    M.D.C. Holdings Inc.
    MDU Resources Group Inc.
    MeadWestvaco Corporation
    Medtronic Inc.
    Mellon Financial Corporation
    The Men's Wearhouse Inc.
    Merck & Co., Inc.
    Mercury General Corporation
    Merrill Lynch & Co. Inc.
    Meta
    Metaldyne Corporation
    Metals USA Inc.
    MetLife Inc.
    Metris Companies Inc
    MGIC Investment Corporation
    MGM Mirage
    Michaels Stores Inc.
    Micron Technology Inc.
    Microsoft Corporation
    Milacron Inc.
    Millennium Chemicals Inc.
    Mirant Corporation
    Mohawk Industries Inc.
    Molex Incorporated
    The MONY Group Inc.
    Morgan Stanley Dean Witter & Co.
    Motorola Inc.
    MPS Group Inc.
    Murphy Oil Corporation
    Nabors Industries Inc
    Nacco Industries Inc
    Nash Finch Company
    National City Corp.
    National Commerce Financial Corporation
    National Fuel Gas Company
    National Oilwell Inc
    National Rural Utilities Cooperative Finance Corporation
    National Semiconductor Corporation
    National Service Industries Inc
    Navistar International Corporation
    NCR Corporation
    The Neiman Marcus Group Inc.
    Netflix
    New Jersey Resources Corporation
    New York Times Company
    Newell Rubbermaid Inc
    Newmont Mining Corporation
    Nextel Communications Inc
    Nicor Inc
    Nike Inc
    NiSource Inc
    Noble Energy Inc
    Nordstrom Inc
    Norfolk Southern Corporation
    Nortek Inc
    North Fork Bancorporation Inc
    Northeast Utilities System
    Northern Trust Corporation
    Northrop Grumman Corporation
    NorthWestern Corporation
    Novellus Systems Inc
    NSTAR
    NTL Incorporated
    Nucor Corp
    Nvidia Corp
    NVR Inc
    Northwest Airlines Corp
    Occidental Petroleum Corp
    Ocean Energy Inc
    Office Depot Inc.
    OfficeMax Inc
    OGE Energy Corp
    Oglethorpe Power Corp.
    Ohio Casualty Corp.
    Old Republic International Corp.
    Olin Corp.
    OM Group Inc
    Omnicare Inc
    Omnicom Group
    On Semiconductor Corp
    ONEOK Inc
    Oracle Corp
    Oshkosh Truck Corp
    Other
    Outback Steakhouse Inc.
    Owens & Minor Inc.
    Owens Corning
    Owens-Illinois Inc
    Oxford Health Plans Inc
    Paccar Inc
    PacifiCare Health Systems Inc
    Packaging Corp. of America
    Pactiv Corp
    Pall Corp
    Pantry Inc
    Park Place Entertainment Corp
    Parker Hannifin Corp.
    Pathmark Stores Inc.
    Paychex Inc
    Payless Shoesource Inc
    Penn Traffic Co.
    Pennzoil-Quaker State Company
    Pentair Inc
    Peoples Energy Corp.
    PeopleSoft Inc
    Pep Boys Manny, Moe & Jack
    Potomac Electric Power Co.
    Pepsi Bottling Group Inc.
    PepsiAmericas Inc.
    PepsiCo Inc.
    Performance Food Group Co.
    Perini Corp
    PerkinElmer Inc
    Perot Systems Corp
    Petco Animal Supplies Inc.
    Peter Kiewit Sons', Inc.
    PETsMART Inc
    Pfizer Inc
    Pacific Gas & Electric Corp.
    Pharmacia Corp
    Phar Mor Inc.
    Phelps Dodge Corp.
    Philip Morris Companies Inc.
    Phillips Petroleum Co
    Phillips Van Heusen Corp.
    Phoenix Companies Inc
    Pier 1 Imports Inc.
    Pilgrim's Pride Corporation
    Pinnacle West Capital Corp
    Pioneer-Standard Electronics Inc.
    Pitney Bowes Inc.
    Pittston Brinks Group
    Plains All American Pipeline LP
    PNC Financial Services Group Inc.
    PNM Resources Inc
    Polaris Industries Inc.
    Polo Ralph Lauren Corp
    PolyOne Corp
    Popular Inc
    Potlatch Corp
    PPG Industries Inc
    PPL Corp
    Praxair Inc
    Precision Castparts Corp
    Premcor Inc.
    Pride International Inc
    Primedia Inc
    Principal Financial Group Inc.
    Procter & Gamble Co.
    Pro-Fac Cooperative Inc.
    Progress Energy Inc
    Progressive Corporation
    Protective Life Corp
    Provident Financial Group
    Providian Financial Corp.
    Prudential Financial Inc.
    PSS World Medical Inc
    Public Service Enterprise Group Inc.
    Publix Super Markets Inc.
    Puget Energy Inc.
    Pulte Homes Inc
    Qualcomm Inc
    Quanta Services Inc.
    Quantum Corp
    Quest Diagnostics Inc.
    Questar Corp
    Quintiles Transnational
    Qwest Communications Intl Inc
    R.J. Reynolds Tobacco Company
    R.R. Donnelley & Sons Company
    Radio Shack Corporation
    Raymond James Financial Inc.
    Raytheon Company
    Reader's Digest Association Inc.
    Reebok International Ltd.
    Regions Financial Corp.
    Regis Corporation
    Reliance Steel & Aluminum Co.
    Reliant Energy Inc.
    Rent A Center Inc
    Republic Services Inc
    Revlon Inc
    RGS Energy Group Inc
    Rite Aid Corp
    Riverwood Holding Inc.
    RoadwayCorp
    Robert Half International Inc.
    Rock-Tenn Co
    Rockwell Automation Inc
    Rockwell Collins Inc
    Rohm & Haas Co.
    Ross Stores Inc
    RPM Inc.
    Ruddick Corp
    Ryder System Inc
    Ryerson Tull Inc
    Ryland Group Inc.
    Sabre Holdings Corp
    Safeco Corp
    Safeguard Scientifics Inc.
    Safeway Inc
    Saks Inc
    Sanmina-SCI Inc
    Sara Lee Corp
    SBC Communications Inc
    Scana Corp.
    Schering-Plough Corp
    Scholastic Corp
    SCI Systems Onc.
    Science Applications Intl. Inc.
    Scientific-Atlanta Inc
    Scotts Company
    Seaboard Corp
    Sealed Air Corp
    Sears Roebuck & Co
    Sempra Energy
    Sequa Corp
    Service Corp. International
    ServiceMaster Co
    Shaw Group Inc
    Sherwin-Williams Company
    Shopko Stores Inc
    Siebel Systems Inc
    Sierra Health Services Inc
    Sierra Pacific Resources
    Silgan Holdings Inc.
    Silicon Graphics Inc
    Simon Property Group Inc
    SLM Corporation
    Smith International Inc
    Smithfield Foods Inc
    Smurfit-Stone Container Corp
    Snap-On Inc
    Solectron Corp
    Solutia Inc
    Sonic Automotive Inc.
    Sonoco Products Co.
    Southern Company
    Southern Union Company
    SouthTrust Corp.
    Southwest Airlines Co
    Southwest Gas Corp
    Sovereign Bancorp Inc.
    Spartan Stores Inc
    Spherion Corp
    Sports Authority Inc
    Sprint Corp.
    SPX Corp
    St. Jude Medical Inc
    St. Paul Cos.
    Staff Leasing Inc.
    StanCorp Financial Group Inc
    Standard Pacific Corp.
    Stanley Works
    Staples Inc
    Starbucks Corp
    Starwood Hotels & Resorts Worldwide Inc
    State Street Corp.
    Stater Bros. Holdings Inc.
    Steelcase Inc
    Stein Mart Inc
    Stewart & Stevenson Services Inc
    Stewart Information Services Corp
    Stilwell Financial Inc
    Storage Technology Corporation
    Stryker Corp
    Sun Healthcare Group Inc.
    Sun Microsystems Inc.
    SunGard Data Systems Inc.
    Sunoco Inc.
    SunTrust Banks Inc
    Supervalu Inc
    Swift Transportation, Co., Inc
    Symbol Technologies Inc
    Synovus Financial Corp.
    Sysco Corp
    Systemax Inc.
    Target Corp.
    Tech Data Corporation
    TECO Energy Inc
    Tecumseh Products Company
    Tektronix Inc
    Teleflex Incorporated
    Telephone & Data Systems Inc
    Tellabs Inc.
    Temple-Inland Inc
    Tenet Healthcare Corporation
    Tenneco Automotive Inc.
    Teradyne Inc
    Terex Corp
    Tesoro Petroleum Corp.
    Texas Industries Inc.
    Texas Instruments Incorporated
    Textron Inc
    Thermo Electron Corporation
    Thomas & Betts Corporation
    Tiffany & Co
    Timken Company
    TJX Companies Inc
    TMP Worldwide Inc
    Toll Brothers Inc
    Torchmark Corporation
    Toro Company
    Tower Automotive Inc.
    Toys 'R' Us Inc
    Trans World Entertainment Corp.
    TransMontaigne Inc
    Transocean Inc
    TravelCenters of America Inc.
    Triad Hospitals Inc
    Tribune Company
    Trigon Healthcare Inc.
    Trinity Industries Inc
    Trump Hotels & Casino Resorts Inc.
    TruServ Corporation
    TRW Inc
    TXU Corp
    Tyson Foods Inc
    U.S. Bancorp
    U.S. Industries Inc.
    UAL Corporation
    UGI Corporation
    Unified Western Grocers Inc
    Union Pacific Corporation
    Union Planters Corp
    Unisource Energy Corp
    Unisys Corporation
    United Auto Group Inc
    United Defense Industries Inc.
    United Parcel Service Inc
    United Rentals Inc
    United Stationers Inc
    United Technologies Corporation
    UnitedHealth Group Incorporated
    Unitrin Inc
    Universal Corporation
    Universal Forest Products Inc
    Universal Health Services Inc
    Unocal Corporation
    Unova Inc
    UnumProvident Corporation
    URS Corporation
    US Airways Group Inc
    US Oncology Inc
    USA Interactive
    USFreighways Corporation
    USG Corporation
    UST Inc
    Valero Energy Corporation
    Valspar Corporation
    Value City Department Stores Inc
    Varco International Inc
    Vectren Corporation
    Veritas Software Corporation
    Verizon Communications Inc
    VF Corporation
    Viacom Inc
    Viad Corp
    Viasystems Group Inc
    Vishay Intertechnology Inc
    Visteon Corporation
    Volt Information Sciences Inc
    Vulcan Materials Company
    W.R. Berkley Corporation
    W.R. Grace & Co
    W.W. Grainger Inc
    Wachovia Corporation
    Wakenhut Corporation
    Walgreen Co
    Wallace Computer Services Inc
    Wal-Mart Stores Inc
    Walt Disney Co
    Walter Industries Inc
    Washington Mutual Inc
    Washington Post Co.
    Waste Management Inc
    Watsco Inc
    Weatherford International Inc
    Weis Markets Inc.
    Wellpoint Health Networks Inc
    Wells Fargo & Company
    Wendy's International Inc
    Werner Enterprises Inc
    WESCO International Inc
    Western Digital Inc
    Western Gas Resources Inc
    WestPoint Stevens Inc
    Weyerhauser Company
    WGL Holdings Inc
    Whirlpool Corporation
    Whole Foods Market Inc
    Willamette Industries Inc.
    Williams Companies Inc
    Williams Sonoma Inc
    Winn Dixie Stores Inc
    Wisconsin Energy Corporation
    Wm Wrigley Jr Company
    World Fuel Services Corporation
    WorldCom Inc
    Worthington Industries Inc
    WPS Resources Corporation
    Wyeth
    Wyndham International Inc
    Xcel Energy Inc
    Xerox Corp
    Xilinx Inc
    XO Communications Inc
    Yellow Corporation
    York International Corp
    Yum Brands Inc.
    Zale Corporation
    Zions Bancorporation`;
  const newCompanies = companies.split(/\r?\n/);
  const options: Props[] = [];
  newCompanies.forEach((company) => {
    const option = { value: company.trim(), label: company.trim() };
    options.push(option);
  });

  return options;
}
