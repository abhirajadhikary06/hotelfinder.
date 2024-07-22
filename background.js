chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "bookingSearch",
    title: "Search by Hotel Finder",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "bookingSearch" && info.selectionText) {
    // Calculate check-in and check-out dates
    const today = new Date();
    const checkInDate = new Date(today.getTime() + 24 * 60 * 60 * 1000); // Next day
    const checkOutDate = new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000); // Next day after check-in

    // Format dates as YYYY-MM-DD
    const checkInDateString = checkInDate.toISOString().split('T')[0];
    const checkOutDateString = checkOutDate.toISOString().split('T')[0];

    // Construct search URL
    const searchUrl = `https://www.booking.com/searchresults.en-gb.html?` +
                      `ss=${encodeURIComponent(info.selectionText)}&` +
                      `nflt=ht_id%3D204&` +
                      `order=price&` +
                      `checkin_year=${checkInDate.getFullYear()}&` +
                      `checkin_month=${checkInDate.getMonth() + 1}&` +
                      `checkin_monthday=${checkInDate.getDate()}&` +
                      `checkout_year=${checkOutDate.getFullYear()}&` +
                      `checkout_month=${checkOutDate.getMonth() + 1}&` +
                      `checkout_monthday=${checkOutDate.getDate()}`;

    chrome.tabs.create({ url: searchUrl });
  }
});
