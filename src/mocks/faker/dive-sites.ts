interface Spots {
  name: string;
  location_city: string;
  description: string;
  entry_map?: string;
  location_google: string;
  hero_img: string;
  coords?: {
    lat: number;
    lng: number;
  };
}

export const spots: Spots[] = [
  {
    name: 'Mala Wharf',
    location_city: 'Lahaina, Maui, Hawaii',
    description:
      'Mala wharf was once a fully-functioning pier which served as a shipping facility for the island’s pineapple and agriculture. In 1992, however, 30 ft. surf came marching into Lahaina as a result of Hurricane Iniki, and the end of the dock was completely destroyed. Today, the pilings from the old dock lie scattered along the ocean floor, and what was once a shipping facility above water is now a healthy artificial reef which is home to a vast array of marine life.',
    entry_map: 'https://snorkel.s3.amazonaws.com/entry/mala_entry.png',
    location_google: 'https://goo.gl/maps/YsaNYnPtsn9bGTyN8',
    hero_img:
      'https://californiadiver.com/wp-content/uploads/2013/09/IMG_4968.jpg',
    coords: {
      lat: 20.8845546,
      lng: -156.6870116,
    },
  },
  {
    name: 'Makena Landing',
    location_city: 'Wailea, Maui, Hawaii',
    description:
      'Located in a stone’s throw from the Grand Wailea in south Maui, Makena Landing is a favorite retreat for both Maui locals and visitors. Despite its relatively small, sandy beach, Makena Landing boasts one of the most accessible coral reefs on the island. While not ideal for sunbathing, it is a perfect spot for those looking to enjoy Maui’s underwater world. From snorkeling and SCUBA diving to kayaking and stand up paddle boarding, Makena Landing offers a wide range of ocean activities. The area is an active launching area with numerous tour operators offering local kayak and stand up paddle boarding (SUP) trips.',
    entry_map: 'https://snorkel.s3.amazonaws.com/entry/makena.jpg',
    location_google: 'https://goo.gl/maps/h7QCiGyRKSmaKH1p6',
    hero_img:
      'http://cdn.mauiguidebook.com/wp-content/uploads/2012/11/makena-landing-2048-cq8.jpg',
    coords: {
      lat: 20.6538433,
      lng: -156.4411353,
    },
  },
  {
    name: 'Ulua Beach',
    location_city: 'Wailea, Maui, Hawaii',
    description:
      "Ulua Beach is one of the beaches in the Wailea resort complex development on Maui's south shore. The sandy beach is located between two rocky points. Ulua Beach is a bit more popular than neighboring Mokapu Beach, with which it shares a parking lot. When the surf is up, it is usually a little higher here than at other beaches in this area, attracting many bodyboarders who enjoy the waves. During calm days, the snorkeling and diving here is excellent. There are many colorful corals and fish. Ulua means `adult crevalle fish in the Hawaiian language.",
    entry_map: 'https://snorkel.s3.amazonaws.com/entry/ulua.jpg',
    location_google: 'https://goo.gl/maps/yBKcTXQ53saZeiYFA',
    hero_img:
      'http://mauiguidebook.com/wp-content/uploads/2010/06/ulua-beach-rs.jpg',
    coords: {
      lat: 20.6903421,
      lng: -156.4611263,
    },
  },
  {
    name: 'Black Rock',
    location_city: 'Kaanapali, Maui, Hawaii',
    description:
      'Black Rock was formed from one of the last-gasp lava flows on this side of the island. It is a rocky outcrop at the far North end of Ka’anapali Beach and blocks off access (from the beach) to the lesser-known Ka’anapali Resort beach called Kahekili Beach Park. The Hawai’ian name for Black Rock is Pu’u Keka’a, and ancient Hawaiians believed that this was the place where their spirits went to jump off to join ancestors forever. Unlucky souls who could not be shown the way by their family ‘aumakua (guardian animal spirit), would wander and attach themselves to rocks in the area. This is likely where the “it is bad luck to take a Hawai’ian lava rock” superstition comes from.',
    entry_map: 'https://snorkel.s3.amazonaws.com/entry/blackrock.jpg',
    location_google: 'https://goo.gl/maps/MEYrwLzDw5bbGqfZ8',
    hero_img:
      'https://www.islands.com/resizer/3AM4ia_xXZeSF93ZwYgya4SNKS8=/1000x750/filters:focal(45x45:55x55)/arc-anglerfish-arc2-prod-bonnier.s3.amazonaws.com/public/EUBOKTRELLCW5AOF4ZPZLVUID4.jpg',
    coords: {
      lat: 20.9270002,
      lng: -156.6966031,
    },
  },
  {
    name: 'Honolua Bay',
    location_city: 'Kaanapali, Maui, Hawaii',
    description:
      'Honolua Bay is a Marine Life Conservation District located on the north western end of Maui.  No fishing of any kind is allowed here making for a sealife density and diversity that is second to none on the Valley Isle. Honolua Bay is surrounded by high rocky cliffs on both sides that shelter it from the wind and keep the water calm.  An old cement boat ramp in the center of the beach divides the shoreline in two. As you sit on the beach you will be looking out across the Pailolo Channel at the eastern shores of the Island of Molokai.',
    entry_map: 'https://snorkel.s3.amazonaws.com/entry/honolua.jpg',
    location_google: 'https://goo.gl/maps/6BXUye7kitSUAuME9',
    hero_img: 'https://snorkel.s3.amazonaws.com/hero/honolua.jpg',
    coords: {
      lat: 21.0139474,
      lng: -156.638533,
    },
  },
  {
    name: 'Maluaka Beach',
    location_city: 'Wailea, Maui, Hawaii',
    description:
      'Located in a stone’s throw from the Grand Wailea in south Maui, Makena Landing is a favorite retreat for both Maui locals and visitors. Despite its relatively small, sandy beach, Makena Landing boasts one of the most accessible coral reefs on the island. While not ideal for sunbathing, it is a perfect spot for those looking to enjoy Maui’s underwater world. From snorkeling and SCUBA diving to kayaking and stand up paddle boarding, Makena Landing offers a wide range of ocean activities. The area is an active launching area with numerous tour operators offering local kayak and stand up paddle boarding (SUP) trips.',
    entry_map: 'https://snorkel.s3.amazonaws.com/entry/maluaka.jpg',
    location_google: 'https://goo.gl/maps/h7QCiGyRKSmaKH1p6',
    hero_img: 'https://snorkel.s3.amazonaws.com/hero/maluaka.jpg',
    coords: {
      lat: 20.653797,
      lng: -156.4410126,
    },
  },
  {
    name: 'Ahihi-Kinau Natural Area Reserve',
    location_city: 'Wailea, Maui, Hawaii',
    description:
      'The ‘Ahihi-Kina‘u reserve is located on the southwest corner of the island of Maui and was the first designated Natural Area Reserve in 1973. The 1,238 acres contain marine ecosystems (807 submereged acres), rare and fragile anchialine ponds, and lava fields from the last eruption of Haleakala 200-500 years ago. Native plant communities that include naio, wiliwili and native cotton exist in kipuka, or pockets, but are severly imperiled by the encroachment of weeds and feral ungulates such as goats. A coral reef survey done by the Division of Aquatic Resources in 2007 indicated that the reef community within the NAR boundary waters was the only reef from their test sites that was not declining overall.  Preserving the integrity of the anchialine pools is a major management focus. All access to them is closed. Main threats to these wetlands include non-native invasives such as fish or prawns, algal mat formations, and human disturbance.',
    entry_map: 'https://snorkel.s3.amazonaws.com/entry/ahihi.jpg',
    location_google: 'https://goo.gl/maps/h7QCiGyRKSmaKH1p6',
    hero_img: 'https://snorkel.s3.amazonaws.com/hero/ahihi.jpg',
    coords: {
      lat: 20.653797,
      lng: -156.4410126,
    },
  },
  {
    name: 'Kapalua Bay',
    location_city: 'Kapalua, Maui, Hawaii',
    description:
      'Kapalua Bay is a sheltered white sand beach on the north west side of Maui.  The bay is protected by two reefs that extend out on both ends forming a C-shaped cove making it ideal for snorkeling. The bay’s calm water makes it one of those perfect places for beginner snorkeling and is an ideal spot to take the kids.  Getting into the water couldn’t be easier.  The ocean will literally be a few feet from your beach towel.  The Kapalua Bay Hotel overlooks the beach’s soft sand and tranquil blue water.',
    entry_map: 'https://snorkel.s3.amazonaws.com/entry/kapalua.jpg',
    location_google: 'https://goo.gl/maps/h7QCiGyRKSmaKH1p6',
    hero_img: 'https://snorkel.s3.amazonaws.com/hero/kapalua.jpg',
    coords: {
      lat: 20.653797,
      lng: -156.4410126,
    },
  },
  {
    name: 'Kamaole 1',
    location_city: 'Kihei, Maui, Hawaii',
    description:
      'A wide, sandy beach, with good swimming. The north end of this stretch of beach is called “Charley Young Beach.” Charley Young was a military reporter who came at the wrong time to build his house here – during WWII all these beaches were taken over and made to simulate enemy beach landings. Anyway, Charley got his land back after the war, and built his house. The Charley Young end of Kam I is more popular with locals, and since the lifeguard and more visible parking and beach access for Kam I is at the other end of the beach, Charley Young is not usually as crowded with visitors. The Charley Young parking lot is on Kaiau St., as is a public access path and stairs to that end of the beach. Parking for the rest of Kam I is at the main parking area right in front of the beach, on street, and at an overflow lot across the road. (see Google map below for all Kam parking lots.)',
    entry_map: 'https://snorkel.s3.amazonaws.com/entry/kamaole_1.jpg',
    location_google: 'https://goo.gl/maps/h7QCiGyRKSmaKH1p6',
    hero_img: 'https://snorkel.s3.amazonaws.com/hero/kamaole_1.jpg',
    coords: {
      lat: 20.653797,
      lng: -156.4410126,
    },
  },
  {
    name: 'Kamaole 2',
    location_city: 'Kihei, Maui, Hawaii',
    description:
      'Another fairly wide sandy beach, the Maui Banyan sits on the end of this beach. While they like to tout it as “one of the finest beaches on Maui”, that claim is a bit exaggerated. What they don’t share in the glossy literature is that after large Kona storms, the sand can temporarily be removed by the ocean leaving rounded lava rock (resembling river rocks, except black.) In fact, the old-time Hawai’ian name for this beach (you know, from the folks that weren’t trying to sell you a condo) is “Ili’iliholo”, which literally means “running pebbles.” (Salesman bashing aside, most days of the year this is still a pretty nice beach!)',
    entry_map: 'https://snorkel.s3.amazonaws.com/entry/kamaole_2.jpg',
    location_google: 'https://goo.gl/maps/h7QCiGyRKSmaKH1p6',
    hero_img: 'https://snorkel.s3.amazonaws.com/hero/kamaole_2.jpg',
    coords: {
      lat: 20.653797,
      lng: -156.4410126,
    },
  },
  {
    name: 'Kamaole 3',
    location_city: 'Kihei, Maui, Hawaii',
    description:
      'Kam III is the most popular of the three beaches. It is also the best for boogie-boarding, with a regular break here that can get fairly large during south swells. It is shortest and least wide of the Kama’oles, but it does have the most facilities and a gigantic grassy park area. It also has a new playground and bathroom, and plenty of parking (But weekends & holidays are very popular here – so you will probably need to park in the overflow parking lot.) Be aware that some Large rocks are found protruding from the ocean (and less so, the sand) along some pockets of Kam III. There is also a second rock-bracketed area that forms a more protected cove at the south end Kam III, the cove is called Ana’iao by old-timers. (You’ll likely be the only person there that knows that name!)',
    entry_map: 'https://snorkel.s3.amazonaws.com/entry/kamaole_3.jpg',
    location_google: 'https://goo.gl/maps/h7QCiGyRKSmaKH1p6',
    hero_img: 'https://snorkel.s3.amazonaws.com/hero/kamaole_3.jpg',
    coords: {
      lat: 20.653797,
      lng: -156.4410126,
    },
  },
  {
    name: 'Carthaginian',
    location_city: 'Lahaina, Maui, Hawaii',
    description:
      'Carthaginian II sits at a max depth of 97 feet on a sandy seabed. There is typically a slight current on the site, but the wreck is appropriate for scuba divers of beginner and intermediate skill levels. The masts have collapsed on deck, and divers can swim through the large, accessible hold. The engine room and forward compartment have been closed off, but scuba divers can still peer in through the bars. Frogfish can be found all over the wreck, so keep a sharp eye out. Trumpet fish, sergeant major, orange spine unicornfish, rainbow cleaner wrasse and other small fish can be seen swimming about the ship. It is also possible to see turtles, sharks and eagle rays on this site.',
    entry_map: 'https://snorkel.s3.amazonaws.com/entry/carthaginian.jpg',
    location_google: 'https://goo.gl/maps/mdAPEEKmVbNnDrkP7',
    hero_img: 'https://snorkel.s3.amazonaws.com/hero/carthaginian.jpg',
    coords: {
      lat: 20.8627222,
      lng: -156.6773831,
    },
  },
  {
    name: 'Molokai Hammerhead Dive (Mokuhoʻoniki)',
    location_city: 'Molokai, Hawaii',
    description:
      'An advanced dive that leaves from Maui over to the coast of the neighboring island of Molokai. In the summer, there is a pod of hammerhead sharks that swims in the area. The best time for this dive is in the summer months, around May to September. The crossing is notoriously rough, so be prepared with some anti-nausea pills.',
    entry_map: 'https://snorkel.s3.amazonaws.com/entry/molokai_hammerhead.jpg',
    location_google: 'https://goo.gl/maps/1LdVztnFzSiG7Hed9',
    hero_img: 'https://snorkel.s3.amazonaws.com/hero/molokai_hammerhead.jpg',
    coords: {
      lat: 21.1328395,
      lng: -156.7052185,
    },
  },
  {
    name: 'Napili Bay',
    location_city: 'Lahaina, Maui, Hawaii',
    description:
      'Entry is sandy, and the bottom is sandy with moderately steep entry and then reef further out. Sea turtles frequent the bay, and snorkeling can be fair when the surf is mellow. When the surf is up visibility, and thus snorkeling, is poor. The water is frequently glassy, but when big swells come in waves can become quite large, and the rip currents which form here pull directly out to sea. Less experienced swimmers should avoid the water here during such conditions. There are restaurants, bathrooms and a general store in the resort. There is a shopping center with supermarket between the main highway and the resort.',
    entry_map: 'https://snorkel.s3.amazonaws.com/entry/napili.jpg',
    location_google: 'https://goo.gl/maps/PK1vzCXb7KrFLakw7',
    hero_img: 'https://snorkel.s3.amazonaws.com/hero/napili.jpg',
    coords: {
      lat: 20.9965678,
      lng: -156.6700267,
    },
  },
  {
    name: 'Olowalu Mile Marker 14',
    location_city: 'Olowalu, Maui, Hawaii',
    description:
      'Mile Marker 14 is the common nickname for a beach in Olowalu, on the west side of Maui. You can find it by looking for the “14” mile marker sign between Lahaina and the cliffs that separate west Maui from central Maui.  It’s seven miles south of Lahaina on the Honoapiilani Highway (Route 30). This area is said to be the best snorkel spot for beginners.  The water is shallow close to shore and is calm on most days (usually most calm in the mornings).  Be careful not to step on or touch the coral reef.  No facilities.  No turn lanes or paved parking, so watch for traffic when turning back onto the highway. The beach is not as wide or beautiful as some other Maui beaches, so this spot is best for snorkeling but not best for lying on the beach.',
    entry_map: 'https://snorkel.s3.amazonaws.com/entry/olowalu.jpg',
    location_google: 'https://goo.gl/maps/RtCrj4q6XtAD8KDg8',
    hero_img: 'https://snorkel.s3.amazonaws.com/hero/olowalu.jpg',
    coords: {
      lat: 20.8091339,
      lng: -156.6061803,
    },
  },
];
