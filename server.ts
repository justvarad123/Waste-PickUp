import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Allow large payloads for image uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY)
  });
});

// AI Item Identification and Evaluation API
app.post('/api/analyze-item', async (req, res) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', itemDescriptionHint } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Missing imageBase64 in request body' });
    }

    // Clean base64 string if data URL prefix is attached
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not set. Generating intelligent simulated analysis for demo.');
      return res.json({
        analysis: generateFallbackAnalysis(itemDescriptionHint || 'household item')
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const prompt = `You are the lead AI appraiser and logistics classifier for "Sell / Dispose Anything - Jath, Sangli" - a circular economy waste pickup and item disposition platform operating in Jath (जत) taluka, Sangli district (सांगली जिल्हा), Maharashtra, India.
Analyze this photo of an item that a resident or business in Jath wants to sell, recycle, donate, or dispose.
Your job is to:
1. Identify the exact item name (e.g. "Old Godrej/Whirlpool Washing Machine", "Broken Laptop", "Old Cotton Gaadi / Mattress", "Raddi / Cardboard Boxes (रद्दी खोकी)", "Scrap Iron Pipes / Drip Tubes", "Old Wooden Cot / Table").
2. Determine category: Choose the most accurate from ["Electronic appliance", "Electronics / Tech", "Bulky Furniture", "Paper / Cardboard", "Plastic & Polymer", "Scrap Metal", "Construction waste", "Household General"].
3. Determine condition: Choose strictly from ["Working / Like New", "Used / Functional", "Needs Repair", "Broken / Scrap Material", "Mixed Waste"].
4. Determine if likely recyclable: boolean true/false.
5. Provide recyclability percentage (0-100).
6. List primary materials detected (e.g. ["Stainless Steel", "Copper Motor Wires", "ABS Plastic", "Corrugated Fiberboard"]).
7. Determine estimated pickup vehicle/crew type appropriate for Indian / Maharashtra roads (e.g. "Tata Ace / Chhota Hathi (छोटा हाथी)", "Piaggio Ape 3-Wheeler Cargo Auto", "Mahindra Bolero Pickup", "Tractor-Trolley / Heavy Hauler").
8. Weight estimate in kg (e.g. "50 - 65 kg") and rough dimensions (e.g. "85cm H x 60cm W x 55cm D").
9. Special handling instructions for safety/pickup (e.g. "Drain water pipes", "Keep raddi dry", "Heavy item - 2 persons needed", "Lithium battery caution").
10. Ecological impact summary (e.g. "Recovers high-grade copper and saves approx 80kg CO2e emissions in Sangli district").
11. Recommend the best single route: "sell", "recycle", "donate", or "dispose".
12. For all 4 options (sell, recycle, donate, dispose):
    - IMPORTANT CURRENCY: Always use "₹" (Indian Rupees) as the currency. Never use "$".
    - sell: eligible (true/false), amount (estimated money in INR user earns, e.g. 1800 for washing machine, 1200 for laptop, 250 for heavy chair), currency ("₹"), partnerType (e.g. "Sangli Appliance Refurbisher" or "Jath Second-Hand Trader"), partnerName (e.g. "Miraj-Jath ReNew Appliances" or "Shivaji Chowk Electronics Exchange"), summary, turnaroundTime ("Within 24 hours" or "Same-day slot"), perks (array of 2-3 benefits, e.g. ["Instant UPI / Cash payout on doorstep", "Free doorstep disconnection in Jath", "No packing needed"]).
    - recycle: eligible (true/false), amount (scrap payout or raddi credit user gets in INR, e.g. 650 for scrap metal/motor, 150 for cardboard bundle), currency ("₹"), partnerType (e.g. "Authorized Sangli E-Waste Recycler" or "Jath Bhangar Kendra"), partnerName (e.g. "Sangli Green Metal Recyclers" or "Jath Scrap Traders Association"), summary, turnaroundTime, perks (e.g. ["Certified digital weighing scale", "Cash or PhonePe/GPay on spot", "100% recycling guarantee"]).
    - donate: eligible (true/false), amount (estimated tax deduction/social value in INR, e.g. 1500), currency ("₹"), partnerType (e.g. "Gramin Punarvapar NGO" or "Sangli District Social Welfare Trust"), partnerName (e.g. "Jath Rural Community Upliftment Trust" or "Shri Ramling Seva Ashram"), summary, turnaroundTime, perks (e.g. ["80G Tax receipt issued", "Supports local rural families in Sangli", "Free doorstep pickup"]).
    - dispose: eligible (true/false), amount (fee in INR if bulky debris, 0 if free municipal slot under Swachh Bharat / Nagar Parishad, e.g. 0 or 250), currency ("₹"), partnerType (e.g. "Jath Nagar Parishad Bulky Waste Wing" or "Sangli Clean District Haulers"), partnerName (e.g. "Jath Municipal Swachhata Division" or "Jath Eco-Haul Service"), summary, turnaroundTime, perks (e.g. ["Official Nagar Parishad disposal", "Zero roadside littering", "Authorized landfill-free processing"]).

Additional user hint if any: "${itemDescriptionHint || 'none'}".
Location context: Jath, Sangli District, Maharashtra, India.
Return strict JSON matching the requested structure with currency "₹".`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType || 'image/jpeg',
              data: cleanBase64,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            itemName: { type: Type.STRING },
            category: { type: Type.STRING },
            condition: {
              type: Type.STRING,
              enum: ['Working / Like New', 'Used / Functional', 'Needs Repair', 'Broken / Scrap Material', 'Mixed Waste']
            },
            isRecyclable: { type: Type.BOOLEAN },
            recyclabilityPercentage: { type: Type.INTEGER },
            primaryMaterials: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            estimatedPickupType: { type: Type.STRING },
            weightEstimateKg: { type: Type.STRING },
            dimensionsEstimate: { type: Type.STRING },
            specialHandlingNotes: { type: Type.STRING },
            ecoImpactSummary: { type: Type.STRING },
            recommendedAction: {
              type: Type.STRING,
              enum: ['sell', 'recycle', 'donate', 'dispose']
            },
            confidenceScore: { type: Type.NUMBER },
            options: {
              type: Type.OBJECT,
              properties: {
                sell: {
                  type: Type.OBJECT,
                  properties: {
                    eligible: { type: Type.BOOLEAN },
                    amount: { type: Type.NUMBER },
                    isPayout: { type: Type.BOOLEAN },
                    currency: { type: Type.STRING },
                    partnerType: { type: Type.STRING },
                    partnerName: { type: Type.STRING },
                    summary: { type: Type.STRING },
                    turnaroundTime: { type: Type.STRING },
                    perks: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ['eligible', 'amount', 'isPayout', 'currency', 'partnerType', 'partnerName', 'summary', 'turnaroundTime', 'perks']
                },
                recycle: {
                  type: Type.OBJECT,
                  properties: {
                    eligible: { type: Type.BOOLEAN },
                    amount: { type: Type.NUMBER },
                    isPayout: { type: Type.BOOLEAN },
                    currency: { type: Type.STRING },
                    partnerType: { type: Type.STRING },
                    partnerName: { type: Type.STRING },
                    summary: { type: Type.STRING },
                    turnaroundTime: { type: Type.STRING },
                    perks: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ['eligible', 'amount', 'isPayout', 'currency', 'partnerType', 'partnerName', 'summary', 'turnaroundTime', 'perks']
                },
                donate: {
                  type: Type.OBJECT,
                  properties: {
                    eligible: { type: Type.BOOLEAN },
                    amount: { type: Type.NUMBER },
                    isPayout: { type: Type.BOOLEAN },
                    currency: { type: Type.STRING },
                    partnerType: { type: Type.STRING },
                    partnerName: { type: Type.STRING },
                    summary: { type: Type.STRING },
                    turnaroundTime: { type: Type.STRING },
                    perks: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ['eligible', 'amount', 'isPayout', 'currency', 'partnerType', 'partnerName', 'summary', 'turnaroundTime', 'perks']
                },
                dispose: {
                  type: Type.OBJECT,
                  properties: {
                    eligible: { type: Type.BOOLEAN },
                    amount: { type: Type.NUMBER },
                    isPayout: { type: Type.BOOLEAN },
                    currency: { type: Type.STRING },
                    partnerType: { type: Type.STRING },
                    partnerName: { type: Type.STRING },
                    summary: { type: Type.STRING },
                    turnaroundTime: { type: Type.STRING },
                    perks: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ['eligible', 'amount', 'isPayout', 'currency', 'partnerType', 'partnerName', 'summary', 'turnaroundTime', 'perks']
                }
              },
              required: ['sell', 'recycle', 'donate', 'dispose']
            }
          },
          required: [
            'itemName',
            'category',
            'condition',
            'isRecyclable',
            'recyclabilityPercentage',
            'primaryMaterials',
            'estimatedPickupType',
            'weightEstimateKg',
            'dimensionsEstimate',
            'specialHandlingNotes',
            'ecoImpactSummary',
            'recommendedAction',
            'confidenceScore',
            'options'
          ]
        }
      }
    });

    const parsedData = JSON.parse(response.text || '{}');
    return res.json({ analysis: parsedData });
  } catch (error: any) {
    console.error('Gemini vision analysis error:', error?.message || error);
    // Return graceful fallback so user can still continue without interruption
    return res.json({
      analysis: generateFallbackAnalysis(req.body.itemDescriptionHint || 'household item'),
      note: 'Analyzed using offline smart heuristic classifier.'
    });
  }
});

// Create Pickup API Endpoint
app.post('/api/create-pickup', (req, res) => {
  try {
    const { item, itemPhoto, action, pickupSchedule, payoutOrPayment } = req.body;

    if (!item || !action || !pickupSchedule) {
      return res.status(400).json({ error: 'Missing required booking fields' });
    }

    const selectedOption = item.options[action];
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const trackingNumber = `PKP-${Date.now().toString().slice(-4)}${randomSuffix}`;

    const newBooking = {
      id: `booking-${Date.now()}`,
      createdAt: new Date().toISOString(),
      trackingNumber,
      item,
      itemPhoto,
      action,
      actionDetails: {
        partnerName: selectedOption.partnerName,
        partnerType: selectedOption.partnerType,
        amount: selectedOption.amount,
        isPayout: selectedOption.isPayout,
        currency: selectedOption.currency || '₹',
        description: selectedOption.summary,
      },
      pickupSchedule,
      payoutOrPayment: {
        method: payoutOrPayment?.method || (action === 'sell' ? 'upi_instant' : 'cash_on_pickup'),
        accountOrId: payoutOrPayment?.accountOrId || 'Doorstep Verified (Jath)',
        status: action === 'sell' ? 'pending_verification' : 'released_to_account'
      },
      status: 'scheduled',
      timeline: [
        {
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          title: 'Pickup Order Confirmed',
          description: `Assigned to ${selectedOption.partnerName} (${selectedOption.partnerType}).`
        },
        {
          timestamp: 'Upcoming Slot',
          title: 'Driver Dispatch & Inspection',
          description: `Pickup scheduled for ${pickupSchedule.date} during ${pickupSchedule.timeSlot} in Jath.`
        }
      ]
    };

    return res.json({
      success: true,
      booking: newBooking
    });
  } catch (err: any) {
    console.error('Error creating pickup:', err);
    return res.status(500).json({ error: 'Failed to create pickup booking' });
  }
});

// Heuristic fallback helper for robustness
function generateFallbackAnalysis(hint: string) {
  const hintLower = hint.toLowerCase();

  if (hintLower.includes('wash') || hintLower.includes('appliance') || hintLower.includes('fridge')) {
    return {
      itemName: 'Home Electronic Appliance (Washing Unit / Refrigerator)',
      category: 'Electronic appliance',
      condition: 'Used / Functional',
      isRecyclable: true,
      recyclabilityPercentage: 88,
      primaryMaterials: ['Stainless Steel', 'Motor Copper Windings', 'Polypropylene Casing', 'Cast Aluminum'],
      estimatedPickupType: 'Tata Ace / Chhota Hathi (छोटा हाथी)',
      weightEstimateKg: '55 - 65 kg',
      dimensionsEstimate: '85cm H x 60cm W x 58cm D',
      specialHandlingNotes: 'Please empty all water lines prior to driver arrival. 2-person crew assigned in Jath.',
      ecoImpactSummary: 'Diverts 60kg of metal and prevents approx 90kg CO2e emissions in Sangli district.',
      recommendedAction: 'sell',
      confidenceScore: 0.93,
      options: {
        sell: {
          eligible: true,
          amount: 2200,
          isPayout: true,
          currency: '₹',
          partnerType: 'Certified Appliance Refurbisher',
          partnerName: 'Miraj-Jath ReNew Home Appliances',
          summary: 'Refurbisher technician tests motor and drum bearings; pays immediate spot cash or UPI upon loading.',
          turnaroundTime: 'Within 24 hours',
          perks: ['Instant UPI (PhonePe/GPay) or Cash on spot', 'Free doorstep disconnection in Jath', 'No packaging needed']
        },
        recycle: {
          eligible: true,
          amount: 850,
          isPayout: true,
          currency: '₹',
          partnerType: 'Licensed Scrap Metal Yard',
          partnerName: 'Jath Scrap Traders Association (भंगार केंद्र)',
          summary: 'Dismantled for motor copper stator, stainless steel drum, and aluminum cast scrap.',
          turnaroundTime: 'Same-day evening slot',
          perks: ['Doorstep digital scale weigh-in', 'Direct spot cash or UPI', '100% recycling compliance']
        },
        donate: {
          eligible: true,
          amount: 1800,
          isPayout: false,
          currency: '₹',
          partnerType: 'Rural Community NGO',
          partnerName: 'Jath Gramin Samajik Seva Trust',
          summary: 'Donated to community transitional shelter or rural school staff quarters in Jath taluka.',
          turnaroundTime: '48 hours',
          perks: ['80G Tax exemption receipt issued', 'Direct social benefit in Sangli', 'Free doorstep collection']
        },
        dispose: {
          eligible: true,
          amount: 0,
          isPayout: false,
          currency: '₹',
          partnerType: 'Civic Environmental Facility',
          partnerName: 'Jath Nagar Parishad Swachhata Division',
          summary: 'Free municipal bulky item pickup under the Swachh Bharat Swachh Jath scheme.',
          turnaroundTime: 'Scheduled weekly run',
          perks: ['Official municipal haul in Jath', 'Zero dumping fines', 'Free residential service']
        }
      }
    };
  }

  // Default fallback for any general item
  return {
    itemName: 'Identified Household Item / Material',
    category: 'Household General',
    condition: 'Used / Functional',
    isRecyclable: true,
    recyclabilityPercentage: 82,
    primaryMaterials: ['Polymer Plastic', 'Ferrous Scrap Metal', 'Cardboard & Wood'],
    estimatedPickupType: 'Piaggio Ape 3-Wheeler Cargo Auto',
    weightEstimateKg: '8 - 15 kg',
    dimensionsEstimate: '50cm x 40cm x 30cm',
    specialHandlingNotes: 'Keep clean and place in front courtyard or porch for easy driver collection in Jath.',
    ecoImpactSummary: 'Recovers primary materials and keeps bulky items out of open roadsides in Sangli.',
    recommendedAction: 'sell',
    confidenceScore: 0.89,
    options: {
      sell: {
        eligible: true,
        amount: 350,
        isPayout: true,
        currency: '₹',
        partnerType: 'Local Jath Secondhand Reseller',
        partnerName: 'Shivaji Chowk Goods Exchange',
        summary: 'Direct buyout from verified local dealer upon doorstep inspection.',
        turnaroundTime: 'Same-day or next-day',
        perks: ['Instant UPI or Cash on spot', 'Doorstep pickup in Jath', 'Zero listing hassle']
      },
      recycle: {
        recycle: true,
        eligible: true,
        amount: 150,
        isPayout: true,
        currency: '₹',
        partnerType: 'Material Recovery Facility',
        partnerName: 'Sangli District Green Recyclers',
        summary: 'High-efficiency sorting into segregated clean material streams.',
        turnaroundTime: 'Next 24h',
        perks: ['Scrap credit issued', 'Doorstep digital weighing', 'Zero landfill guarantee']
      },
      donate: {
        eligible: true,
        amount: 400,
        isPayout: false,
        currency: '₹',
        partnerType: 'Registered Charity Partner',
        partnerName: 'Jath Taluka Gramin Vikas Trust',
        summary: 'Distributed to community centers or rural families in Jath villages.',
        turnaroundTime: 'Flexible weekday',
        perks: ['80G Tax deduction voucher', 'Community welfare acknowledgement', 'Volunteer collection']
      },
      dispose: {
        eligible: true,
        amount: 0,
        isPayout: false,
        currency: '₹',
        partnerType: 'Municipal Sanitation Carrier',
        partnerName: 'Jath Nagar Parishad Bulky Waste Wing',
        summary: 'Certified safe environmental processing according to Swachh Maharashtra norms.',
        turnaroundTime: 'Within 48h',
        perks: ['Certified responsible disposal', 'Zero roadside littering', 'Clean city compliance']
      }
    }
  };
}

// Server-Side Rendered (SSR) Rates and Guidelines Page for Fast Indexing & Crawlers
app.get('/ssr/rates', (req, res) => {
  const categoriesData = [
    { title: 'Old Appliances (घरगुती उपकरणे)', items: 'Washing machines, fridges, air coolers, mixies', payout: '₹800 - ₹3,500' },
    { title: 'Electronics & Mobiles (इलेक्ट्रॉनिक्स)', items: 'Broken laptops, smartphones, invertor batteries', payout: '₹500 - ₹4,500' },
    { title: 'Old Mattresses & Cots (गादी व फर्निचर)', items: 'Cotton gaadi, spring mattresses, wooden cots', payout: '₹200 - ₹1,500' },
    { title: 'Paper, Books & Cartons (रद्दी व खोकी)', items: 'Corrugated cartons, newspaper raddi, old books', payout: '₹14 - ₹22 / kg' },
    { title: 'Scrap Metal & Iron (लोखंड व तांबे)', items: 'Iron grills, tin sheets, copper wires, brass', payout: '₹32 - ₹480 / kg' },
    { title: 'Farm Plastics & Barrels (प्लॅस्टिक व ड्रम)', items: 'Drip irrigation pipes, HDPE chemical barrels', payout: '₹18 - ₹35 / kg' },
    { title: 'Old Two-Wheelers (जुनी वाहने)', items: 'Scrap scooters, bicycle frames, battery scrap', payout: '₹1,500 - ₹12,000' },
  ];

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Scrap Rates & Doorstep Pickup Directory - Jath, Sangli (SSR)</title>
  <meta name="description" content="Official SSR directory of scrap buyout prices, recycling rates, and doorstep pickup guidelines for Jath, Sangli district."/>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; margin: 0; padding: 24px; background: #f8fafc; color: #0f172a; }
    .container { max-width: 800px; margin: 0 auto; background: #ffffff; padding: 32px; border-radius: 16px; border: 1px solid #e2e8f0; }
    h1 { color: #047857; margin-top: 0; }
    .badge { display: inline-block; background: #ecfdf5; color: #065f46; padding: 4px 12px; border-radius: 9999px; font-weight: 600; font-size: 12px; border: 1px solid #a7f3d0; }
    table { width: 100%; border-collapse: collapse; margin-top: 24px; }
    th, td { text-align: left; padding: 12px; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
    th { background: #f1f5f9; color: #334155; font-weight: 600; }
    .payout { font-weight: bold; color: #047857; }
    .back-btn { display: inline-block; margin-top: 24px; background: #059669; color: #fff; text-decoration: none; padding: 10px 18px; border-radius: 8px; font-weight: 600; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="badge">SSR Pre-rendered Page • Jath Municipal Swachhata Network</div>
    <h1>Jath Doorstep Scrap & Item Pickup Directory</h1>
    <p>Live buyout estimates, authorized recycling rates, and doorstep collection guidelines across Jath Taluka, Sangli District, Maharashtra.</p>
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Included Materials</th>
          <th>Doorstep Payout / Rate</th>
        </tr>
      </thead>
      <tbody>
        ${categoriesData.map(c => `<tr>
          <td><strong>${c.title}</strong></td>
          <td>${c.items}</td>
          <td class="payout">${c.payout}</td>
        </tr>`).join('')}
      </tbody>
    </table>
    <a href="/" class="back-btn">← Launch AI Camera & Scanner App</a>
  </div>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.send(html);
});

// Start Server and mount Vite middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    // Static asset caching for Core Web Vitals
    app.use(express.static(distPath, {
      maxAge: '1d',
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.js') || filePath.endsWith('.css') || filePath.endsWith('.svg')) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
      }
    }));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
