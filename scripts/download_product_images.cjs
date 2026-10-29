const fs = require('fs');
const path = require('path');
const https = require('https');

const IMAGES_TO_DOWNLOAD = [
  // Categories
  {
    url: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?q=80&w=1200&auto=format&fit=crop', // Dehydrated onions & vegetables
    dest: 'public/images/categories/cat-commodity.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1200&auto=format&fit=crop', // Indian spices & herbs
    dest: 'public/images/categories/cat-consumer.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop', // Luxury architectural porcelain tiles
    dest: 'public/images/categories/cat-industrial.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1508061252966-ef730040e290?q=80&w=1200&auto=format&fit=crop', // Global almond & nut imports
    dest: 'public/images/categories/cat-sourcing.jpg'
  },

  // Panels
  {
    url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=1200&auto=format&fit=crop', // Panel 1: Dehydrated white & red onions
    dest: 'public/images/panels/panel-1-connections.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=1200&auto=format&fit=crop', // Panel 2: Golden Alleppey turmeric & Indian spices
    dest: 'public/images/panels/panel-2-sourcing.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=1200&auto=format&fit=crop', // Panel 3: Premium aged 1121 Basmati rice grains
    dest: 'public/images/panels/panel-3-logistics.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop', // Panel 4: Global raw cashews & almonds
    dest: 'public/images/panels/panel-4-markets.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=1200&auto=format&fit=crop', // Panel 5: Areca palm leaf tableware & eco goods
    dest: 'public/images/panels/panel-5-opportunities.jpg'
  },

  // Hero & Trade Corridors
  {
    url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1400&auto=format&fit=crop', // Hero Port: Mundra container terminal
    dest: 'public/images/hero/hero-port.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1400&auto=format&fit=crop', // Hero Vessel: Deepwater container liner
    dest: 'public/images/hero/hero-vessel.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop', // Trade corridor logistics
    dest: 'public/images/trade/trade-corridor.jpg'
  },

  // Gallery
  {
    url: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?q=80&w=1200&auto=format&fit=crop', // Gallery 1: Garlic cloves & dehydrated garlic
    dest: 'public/images/gallery/gallery-1.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=1200&auto=format&fit=crop', // Gallery 2: Stainless steel food processing & optical sorting
    dest: 'public/images/gallery/gallery-2.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?q=80&w=1200&auto=format&fit=crop', // Gallery 3: Guntur sun-dried red chilies
    dest: 'public/images/gallery/gallery-3.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1200&auto=format&fit=crop', // Gallery 4: Alphonso mango & spray-dried fruit extracts
    dest: 'public/images/gallery/gallery-4.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=1200&auto=format&fit=crop', // Gallery 5: Golden paddy fields & Indian agriculture
    dest: 'public/images/gallery/gallery-5.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop', // Gallery 6: Precision brass & Indian manufacturing
    dest: 'public/images/gallery/gallery-6.jpg'
  },

  // About Editorial
  {
    url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=1200&auto=format&fit=crop', // About Editorial 1: Dehydrated crops
    dest: 'public/images/about/about-editorial-1.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop', // About Editorial 2: Port Mundra
    dest: 'public/images/about/about-editorial-2.jpg'
  },

  // Dedicated Product Shots
  {
    url: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?q=80&w=1000&auto=format&fit=crop',
    dest: 'public/images/products/dehydrated-onion.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?q=80&w=1000&auto=format&fit=crop',
    dest: 'public/images/products/dehydrated-garlic.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=1000&auto=format&fit=crop',
    dest: 'public/images/products/turmeric-curcumin.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?q=80&w=1000&auto=format&fit=crop',
    dest: 'public/images/products/guntur-chili.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=1000&auto=format&fit=crop',
    dest: 'public/images/products/basmati-rice.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
    dest: 'public/images/products/morbi-tiles.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=1000&auto=format&fit=crop',
    dest: 'public/images/products/areca-tableware.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1000&auto=format&fit=crop',
    dest: 'public/images/products/spray-mango.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1508061252966-ef730040e290?q=80&w=1000&auto=format&fit=crop',
    dest: 'public/images/products/california-almonds.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop',
    dest: 'public/images/products/raw-cashews.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=1000&auto=format&fit=crop',
    dest: 'public/images/products/food-processing-plant.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1000&auto=format&fit=crop',
    dest: 'public/images/products/mundra-dispatch.jpg'
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const fullPath = path.resolve(__dirname, '..', dest);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(fullPath);
    const request = https.get(url, (res) => {
      // Handle redirect if any
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (redirectRes) => {
          redirectRes.pipe(file);
          file.on('finish', () => {
            file.close(() => resolve(dest));
          });
        }).on('error', (err) => {
          fs.unlink(fullPath, () => {});
          reject(err);
        });
        return;
      }

      if (res.statusCode !== 200) {
        fs.unlink(fullPath, () => {});
        reject(new Error(`Failed to download ${url}: status code ${res.statusCode}`));
        return;
      }

      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(dest));
      });
    });

    request.on('error', (err) => {
      fs.unlink(fullPath, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log(`Starting download of ${IMAGES_TO_DOWNLOAD.length} authentic trade & product photos...`);
  for (const item of IMAGES_TO_DOWNLOAD) {
    try {
      await downloadFile(item.url, item.dest);
      console.log(`[OK] Saved -> ${item.dest}`);
    } catch (err) {
      console.error(`[ERR] Failed -> ${item.dest}: ${err.message}`);
    }
  }
  console.log('All image downloads complete!');
}

run();
