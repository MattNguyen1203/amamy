const countries = [
  {
    country: 'Albania',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Flag_of_Albania.svg',
  },
  {
    country: 'Andorra',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Andorra.svg',
  },
  {
    country: 'Armenia',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_Armenia.svg',
  },
  {
    country: 'Austria',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_Austria.svg',
  },
  {
    country: 'Azerbaijan',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Flag_of_Azerbaijan.svg',
  },
  {
    country: 'Belarus',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Flag_of_Belarus.svg',
  },
  {
    country: 'Belgium',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Belgium.svg',
  },
  {
    country: 'Bosnia and Herzegovina',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Flag_of_Bosnia_and_Herzegovina.svg',
  },
  {
    country: 'Bulgaria',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Bulgaria.svg',
  },
  {
    country: 'Croatia',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Flag_of_Croatia.svg',
  },
  {
    country: 'Cyprus',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Cyprus.svg',
  },
  {
    country: 'Czech Republic',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_Czech_Republic.svg',
  },
  {
    country: 'Denmark',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_Denmark.svg',
  },
  {
    country: 'Estonia',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Flag_of_Estonia.svg',
  },
  {
    country: 'Finland',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Finland.svg',
  },
  {
    country: 'France',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg',
  },
  {
    country: 'Georgia',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Flag_of_Georgia.svg',
  },
  {
    country: 'Germany',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg',
  },
  {
    country: 'Greece',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Greece.svg',
  },
  {
    country: 'Hungary',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Flag_of_Hungary.svg',
  },
  {
    country: 'Iceland',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Iceland.svg',
  },
  {
    country: 'Ireland',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Flag_of_Ireland.svg',
  },
  {
    country: 'Italy',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg',
  },
  {
    country: 'Kazakhstan',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Flag_of_Kazakhstan.svg',
  },
  {
    country: 'Latvia',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Flag_of_Latvia.svg',
  },
  {
    country: 'Liechtenstein',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Flag_of_Liechtenstein.svg',
  },
  {
    country: 'Lithuania',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Flag_of_Lithuania.svg',
  },
  {
    country: 'Luxembourg',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Flag_of_Luxembourg.svg',
  },
  {
    country: 'Malta',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Flag_of_Malta.svg',
  },
  {
    country: 'Moldova',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/2/27/Flag_of_Moldova.svg',
  },
  {
    country: 'Monaco',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Flag_of_Monaco.svg',
  },
  {
    country: 'Montenegro',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Montenegro.svg',
  },
  {
    country: 'Netherlands',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg',
  },
  {
    country: 'North Macedonia',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_North_Macedonia.svg',
  },
  {
    country: 'Norway',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Norway.svg',
  },
  {
    country: 'Poland',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Flag_of_Poland.svg',
  },
  {
    country: 'Portugal',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg',
  },
  {
    country: 'Romania',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Flag_of_Romania.svg',
  },
  {
    country: 'Russia',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg',
  },
  {
    country: 'San Marino',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Flag_of_San_Marino.svg',
  },
  {
    country: 'Serbia',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Flag_of_Serbia.svg',
  },
  {
    country: 'Slovakia',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Flag_of_Slovakia.svg',
  },
  {
    country: 'Slovenia',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Flag_of_Slovenia.svg',
  },
  {
    country: 'Spain',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg',
  },
  {
    country: 'Sweden',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Sweden.svg',
  },
  {
    country: 'Switzerland',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Switzerland.svg',
  },
  {
    country: 'Turkey',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg',
  },
  {
    country: 'Ukraine',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg',
  },
  {
    country: 'United Kingdom',
    flag: 'https://flagcdn.com/w320/gb.png',
  },
  {
    country: 'Vatican City',
    flag: 'https://flagcdn.com/w320/va.png',
  },
]
export default countries
