import { EventType, Post, SourceType } from '../timeline.types'
import { loadTweets } from '../../../utils/tweetFetch'

type PostType =
  | EventType.POST
  | EventType.THREAD
  | EventType.INTERVIEW
  | EventType.VIDEO
  | EventType.DEBRIEF
type PostDetails = Omit<Post, 'type' | 'tweet' | 'date' | 'id' | 'source'> & {
  type?: PostType | PostType[]
}

const officialPosts: PostDetails[] = [
  // @austin_hurwitz
  { url: 'https://x.com/austin_hurwitz/status/2018487812526428667', type: EventType.THREAD },
  { url: 'https://x.com/austin_hurwitz/status/2018380486184501436', type: EventType.THREAD },
  { url: 'https://x.com/austin_hurwitz/status/1998056897501417520' },
  { url: 'https://x.com/austin_hurwitz/status/2009038538679992797' },
  { url: 'https://x.com/austin_hurwitz/status/2011460329943826520' },
  {
    url: 'https://x.com/austin_hurwitz/status/2008861601714118884'
  },
  {
    url: 'https://x.com/austin_hurwitz/status/2008737719871304099'
  },
  {
    url: 'https://x.com/austin_hurwitz/status/2001705140873478450'
  },
  {
    url: 'https://x.com/austin_hurwitz/status/1996666112868851753'
  },

  // @boris0chuck
  {
    url: 'https://x.com/boris0chuck/status/2003556939188568413'
  },

  // @greenie_sr
  {
    url: 'https://x.com/greenie_sr/status/2039699072827691260'
  },

  // @neukoai

  { url: 'https://x.com/neukoai/status/2019486804366479412', type: EventType.VIDEO },
  { url: 'https://x.com/neukoai/status/2019446494365950091', type: EventType.VIDEO },
  { url: 'https://x.com/neukoai/status/2019126404995248524' },
  { url: 'https://x.com/neukoai/status/2018725752787607572', type: EventType.THREAD },
  { url: 'https://x.com/neukoai/status/2018419539990491150' },
  { url: 'https://x.com/neukoai/status/2018376412323860913', type: EventType.VIDEO },
  { url: 'https://x.com/neukoai/status/2017371470100414911', type: EventType.VIDEO },
  {
    url: 'https://x.com/neukoai/status/2013357568605765999'
  },
  {
    url: 'https://x.com/neukoai/status/2012218480636928007'
  },
  {
    url: 'https://x.com/neukoai/status/1977763395408429229'
  },
  {
    url: 'https://x.com/neukoai/status/1979268208340406384'
  },
  {
    url: 'https://x.com/neukoai/status/1980355518771392550'
  },
  {
    url: 'https://x.com/neukoai/status/1981125805104312473'
  },
  {
    url: 'https://x.com/neukoai/status/1981740247504269582'
  },
  {
    url: 'https://x.com/neukoai/status/1982894878280569063'
  },
  {
    url: 'https://x.com/neukoai/status/1984362507784351883'
  },
  {
    url: 'https://x.com/neukoai/status/1986152753412919577'
  },
  {
    url: 'https://x.com/neukoai/status/1988703965694111829'
  },
  {
    url: 'https://x.com/neukoai/status/1989425770524225554'
  },
  {
    url: 'https://x.com/neukoai/status/1993801736142909814'
  },
  {
    url: 'https://x.com/neukoai/status/1995902340365185090'
  },
  {
    url: 'https://x.com/neukoai/status/1996332652492943710'
  },
  {
    url: 'https://x.com/neukoai/status/1998483693195899014'
  },
  {
    url: 'https://x.com/neukoai/status/1998848567587582362'
  },
  {
    url: 'https://x.com/neukoai/status/1999215138872918507'
  },
  {
    type: EventType.THREAD,
    url: 'https://x.com/neukoai/status/1999824937666941295'
  },
  {
    url: 'https://x.com/opensea/status/1999827413421986236'
  },
  {
    url: 'https://x.com/neukoai/status/2001399818304840178'
  },
  {
    url: 'https://x.com/neukoai/status/2008635872254595310'
  },
  {
    url: 'https://x.com/neukoai/status/2008939518330827166'
  },
  {
    url: 'https://x.com/neukoai/status/2009756721275637907'
  },
  {
    url: 'https://x.com/neukoai/status/2010835979754525040'
  },
  {
    url: 'https://x.com/neukoai/status/2011106635662717284'
  },
  {
    url: 'https://x.com/wallstreetbets/status/2011861685943075158'
  },
  {
    url: 'https://x.com/neukoai/status/2027103700406128890',
    type: [EventType.THREAD, EventType.VIDEO]
  },
  {
    url: 'https://x.com/neukoai/status/2027494764807873000',
    type: EventType.VIDEO
  },
  {
    url: 'https://x.com/neukoai/status/2030025410604355698',
    type: EventType.VIDEO
  },
  {
    url: 'https://x.com/neukoai/status/2032201944505184701'
  },
  {
    url: 'https://x.com/neukoai/status/2037170835346124890'
  },
  {
    url: 'https://x.com/neukoai/status/2038681397066375515'
  },
  {
    url: 'https://x.com/neukoai/status/2038998755895095664',
    type: [EventType.VIDEO, EventType.THREAD]
  },
  {
    url: 'https://x.com/neukoai/status/2039014653804560798'
  },
  {
    url: 'https://x.com/neukoai/status/2039019221246493163'
  },
  {
    url: 'https://x.com/neukoai/status/2039050312409821372'
  },
  {
    url: 'https://x.com/neukoai/status/2039389051573108883',
    type: EventType.VIDEO
  },
  {
    url: 'https://x.com/neukoai/status/2039405349149585787'
  },
  {
    url: 'https://x.com/neukoai/status/2039705251033280644'
  },
  {
    url: 'https://x.com/neukoai/status/2039727261868269946?',
    type: EventType.THREAD
  },
  {
    url: 'https://x.com/neukoai/status/2039753469414781039'
  },
  {
    url: 'https://x.com/neukoai/status/2039777916800627140'
  },
  {
    url: 'https://x.com/neukoai/status/2040092190400033066',
    type: EventType.THREAD
  },
  {
    url: 'https://x.com/neukoai/status/2040781946066702451'
  },

  //IRIS POSTS BEGIN
  {
    url: 'https://x.com/iris_aurelian/status/2019485603948040254'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2019896184962199882'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2020246036493549924'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2020517551504027713'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2020892194584821943'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2020893323439767715'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2021267138288218370'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2021706025347228073'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2021946424854802660'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2022326894603997294'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2022777860964921428'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2023028048031826197'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2024199261789782366'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2024514621063799056'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2024587735323881587'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2025233403692405224'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2027499407478767980'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2030051641232118083'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2037853270077534329'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2037924922287165690'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2039043112866038187'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2039056497691263114'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2039130877439901718'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2039298190566949096'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2039379707045515627'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2039398199266533685'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2039418631105245240'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2039429733201412322'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2039519649650418028'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2039705953721799110'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2039727754829041902'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2039746470576824734'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2039752970611347720'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2039832300196622510'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2039849533773906267'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2039860991895175488'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2040076057517163004'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2040091275274133843'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2040121763808305195'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2040131336887808055'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2040156850818097628'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2040465446445408605'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2040467346691641477'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2040470873228935188'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2040772303726755966'
  },
  {
    url: 'https://x.com/iris_aurelian/status/2040795410864775325',
    type: EventType.THREAD
  },
  //IRIS POSTS ENDS

  // 1NK_BLOC POSTS BEGIN
  {
    url: 'https://x.com/1nk_bloc/status/2039023251436024097'
  },
  {
    url: 'https://x.com/1nk_bloc/status/2039029968563278144'
  },
  {
    url: 'https://x.com/1nk_bloc/status/2039331594025250992'
  },
  {
    url: 'https://x.com/1nk_bloc/status/2039398603828183507'
  },
  {
    url: 'https://x.com/1nk_bloc/status/2039454675813228686'
  },
  {
    url: 'https://x.com/1nk_bloc/status/2039730653193728070'
  },
  {
    url: 'https://x.com/1nk_bloc/status/2039764063698170342'
  },
  {
    url: 'https://x.com/1nk_bloc/status/2040130315415412934'
  },
  // 1NK_BLOC POSTS ENDS

  // @SQU1NCH
  {
    url: 'https://x.com/SQU1NCH/status/2012246421504721061',
    type: EventType.THREAD
  },
  {
    type: EventType.VIDEO,
    url: 'https://x.com/SQU1NCH/status/2006509264664461714'
  },
  {
    url: 'https://x.com/SQU1NCH/status/2003564428894109966'
  },
  {
    type: EventType.VIDEO,
    url: 'https://x.com/SQU1NCH/status/1997006321661489627'
  },
  {
    url: 'https://x.com/SQU1NCH/status/1996605658758521234'
  },
  {
    type: EventType.THREAD,
    url: 'https://x.com/SQU1NCH/status/1996600123208372394'
  }
]
const communityPosts: PostDetails[] = [
  // @afkboom
  {
    url: 'https://x.com/afkboom/status/1998181754713354379'
  },
  // @BAGFILLERR
  {
    type: EventType.VIDEO,
    url: 'https://x.com/BAGFILLERR/status/2006082909417939424'
  },
  {
    type: EventType.THREAD,
    url: 'https://x.com/BAGFILLERR/status/1987997186039402591'
  },

  // @DegenFigster
  { url: 'https://x.com/DegenFigster/status/2012569459127443709' },
  { url: 'https://x.com/DegenFigster/status/2012928585221238877' },

  // @DendiRedemption
  {
    type: EventType.THREAD,
    url: 'https://x.com/DendiRedemption/status/1983974904870400150'
  },

  // @eleven88eth
  {
    type: EventType.THREAD,
    url: 'https://x.com/eleven88eth/status/1994247572785926543'
  },

  // @feezybellz_ii
  { url: 'https://x.com/feezybellz_ii/status/2015398622544752938' },
  {
    type: EventType.THREAD,
    url: 'https://x.com/feezybellz_ii/status/2010276385198067880'
  },

  //@ FSkifor
  { url: 'https://x.com/FSkifor/status/2015900472272413030' },
  {
    url: 'https://x.com/FSkifor/status/2012287148515299478'
  },

  // @greenknight_sol
  { url: 'https://x.com/greenknight_sol/status/2011373543037042973' },
  { url: 'https://x.com/greenknight_sol/status/2011893996990144813' },

  // @HelveticaVault

  {
    url: 'https://x.com/HelveticVault/status/2014053051061936555'
  },

  // @kezo_futura
  {
    type: EventType.VIDEO,
    url: 'https://x.com/kezo_futura/status/1993398379217584410'
  },
  {
    type: EventType.VIDEO,
    url: 'https://x.com/kezo_futura/status/1999738873237373020'
  },

  // @knollcaptures
  { url: 'https://x.com/knollcaptures/status/2012567279670804655' },
  { url: 'https://x.com/knollcaptures/status/2012920107522289701' },

  // @LostSnow_Rin
  {
    url: 'https://x.com/LostSnow_Rin/status/1981349935489409266'
  },
  {
    url: 'https://x.com/LostSnow_Rin/status/1988946547250495549'
  },
  {
    type: EventType.VIDEO,
    url: 'https://x.com/LostSnow_Rin/status/1991992692524699866'
  },

  // @Marcotics
  { url: 'https://x.com/Marcotics/status/2012593030675529984' },
  { url: 'https://x.com/Marcotics/status/2012956018469122121' },

  // @mikeygnft
  { url: 'https://x.com/mikeygnft/status/2009725799868575786' },

  // @nuyorkinoeth
  {
    url: 'https://x.com/nuyorkinoeth/status/1986177138764947467'
  },

  // @opensea
  {
    url: 'https://x.com/opensea/status/1996333608769061101'
  },

  // @orca_so
  { url: 'https://x.com/orca_so/status/1996333595917762861' },

  // @phygitals
  {
    url: 'https://x.com/phygitals/status/1997006280628621751'
  },
  { url: 'https://x.com/phygitals/status/1996338738599743630' },

  // @solana
  {
    url: 'https://x.com/solana/status/1995959776828948609'
  },

  // @solanaspaces
  {
    url: 'https://x.com/solanaspaces/status/2004193154766143920'
  },

  // @satoshi_owl
  { url: 'https://x.com/satoshi_owl/status/2019746327383396836', type: EventType.DEBRIEF }, // 10
  { url: 'https://x.com/satoshi_owl/status/2001826293109920022', type: EventType.DEBRIEF }, // 9
  { url: 'https://x.com/satoshi_owl/status/1996579259805028652', type: EventType.DEBRIEF }, // 8
  { url: 'https://x.com/satoshi_owl/status/1993858422710641011', type: EventType.DEBRIEF }, // 7
  { url: 'https://x.com/satoshi_owl/status/1991295599384359116', type: EventType.DEBRIEF }, // 6
  { url: 'https://x.com/satoshi_owl/status/1989504633018994750', type: EventType.DEBRIEF }, // 5
  { url: 'https://x.com/satoshi_owl/status/1986267027514769671', type: EventType.DEBRIEF }, // 4
  { url: 'https://x.com/satoshi_owl/status/1985518909911679395', type: EventType.DEBRIEF }, // 3
  { url: 'https://x.com/satoshi_owl/status/1983610368330231897', type: EventType.DEBRIEF }, // 1
  { url: 'https://x.com/satoshi_owl/status/2012600264767819971' },
  { url: 'https://x.com/satoshi_owl/status/2012947684315779236' },
  { url: 'https://x.com/satoshi_owl/status/2013607280080511349' },

  // @Sinsonx
  {
    url: 'https://x.com/Sinsonx/status/1989423048941080590',
    type: EventType.THREAD
  },

  //@RecedingHare
  {
    url: 'https://x.com/RecedingHare/status/2040423771236929868',
    type: EventType.VIDEO
  },

  // @Wakuwaku
  {
    url: 'https://x.com/Wakuwaku/status/2028872055089774752?s=20'
  },

  // @xeetdotai
  { url: 'https://x.com/xeetdotai/status/1996348571290148910' },

  // @veeman_eth
  {
    url: 'https://x.com/veeman_eth/status/1997834837777088860',
    type: EventType.THREAD
  },

  // @CDNHODLer
  {
    url: 'https://x.com/CDNHODLer/status/2027000132252631511'
  },

  // @LiquorGrainNFT
  {
    url: 'https://x.com/LiquorGrainNFT/status/2026319491630502147'
  },

  // @wasabi_protocol
  { url: 'https://x.com/wasabi_protocol/status/2007851601936212016' },
  { url: 'https://x.com/wasabi_protocol/status/1996335723214156123' },
  { url: 'https://x.com/wasabi_protocol/status/2033616175389937691' }
]

//BROADCASST
// https://x.com/neukoai/status/1999467346663211438?s=20

const postData: PostDetails[] = [
  ...officialPosts.map((post) => ({
    ...post,
    source: SourceType.OFFICIAL
  })),
  ...communityPosts.map((post) => ({
    ...post,
    source: SourceType.COMMUNITY
  }))
]

export declare const data: Post[]

export default {
  async load(): Promise<Post[]> {
    return loadTweets(postData, EventType.POST)
  }
}
