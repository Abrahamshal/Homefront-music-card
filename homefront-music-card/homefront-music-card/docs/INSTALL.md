# Installation

## Prerequisites

This card assumes you have a working Music Assistant + WiiM setup. Specifically:

1. **Music Assistant** add-on and integration installed and connected to at least one music provider (Spotify, Apple Music, Tidal, etc.)
2. **mjcumming/wiim** integration installed via HACS, with all your WiiM devices discovered
3. **Music Assistant Queue Actions** integration installed via HACS (needed for queue manipulation)

If any of these are missing the card will render a help panel instead of the player.

## Install via HACS (recommended)

1. In HACS, go to **Frontend**
2. Click the three-dot menu → **Custom repositories**
3. Add this repo URL with category **Dashboard**:

   `https://github.com/<your-github-username>/homefront-music-card`

4. Find "Homefront Music Card" in the HACS Frontend list and click **Download**
5. Restart Home Assistant (or at minimum reload the frontend)

## Manual install

1. Build the latest `dist/homefront-music-card.js` (or download from a release)
2. Copy to `/config/www/community/homefront-music-card/homefront-music-card.js`
3. Add to your Lovelace resources:

   ```yaml
   url: /hacsfiles/homefront-music-card/homefront-music-card.js
   type: module
   ```

## Add to a dashboard

In your dashboard YAML or visual editor:

```yaml
type: custom:homefront-music-card
zones:
  - name: Pool
    wiim: media_player.pool
    ma: media_player.pool_2
  - name: BBQ
    wiim: media_player.bbq
    ma: media_player.bbq_2
  - name: Kitchen
    wiim: media_player.kitchen
    ma: media_player.kitchen_2
  # ... one entry per zone
density: regular
default_lead: media_player.pool
```

### Finding your entity IDs

- WiiM entities: usually `media_player.<name_you_gave_it_in_the_wiim_home_app>`
- MA entities: when both integrations are configured, MA entities typically get a suffix (`_2`, `_ma`, or similar) — check **Settings → Devices & Services → Music Assistant** to confirm exact names

## Troubleshooting

**The card says "Setup incomplete"**: One of the three required integrations is missing. The card lists which one and links to install instructions.

**The card renders but Browse is empty**: The MA entity you configured may not be the right one. Open HA Dev Tools → Services → `media_player.browse_media` and test against each candidate entity until you find one that returns library children.

**Audio cuts out when grouping**: This is the Linkplay-vs-MA-sync conflict the architecture is designed to avoid. Make sure your zone map's `wiim` and `ma` entities are correctly paired per device, and that no other automations are calling `media_player.join` against the MA entities.
