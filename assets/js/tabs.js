      (function () {
        var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
        var panels = {};
        tabs.forEach(function (tab) {
          panels[tab.getAttribute('data-panel')] = document.getElementById(tab.getAttribute('data-panel'));
        });

        function selectTab(tab, focus) {
          tabs.forEach(function (t) {
            var isActive = t === tab;
            t.setAttribute('aria-selected', isActive ? 'true' : 'false');
            t.tabIndex = isActive ? 0 : -1;
            var panel = panels[t.getAttribute('data-panel')];
            if (panel) {
              if (isActive) { panel.removeAttribute('hidden'); }
              else { panel.setAttribute('hidden', ''); }
            }
          });
          if (focus) { tab.focus(); }
          window.scrollTo(0, 0);
        }

        tabs.forEach(function (tab, index) {
          tab.addEventListener('click', function () { selectTab(tab, false); });
          tab.addEventListener('keydown', function (event) {
            var next = null;
            if (event.key === 'ArrowRight') { next = tabs[(index + 1) % tabs.length]; }
            else if (event.key === 'ArrowLeft') { next = tabs[(index - 1 + tabs.length) % tabs.length]; }
            else if (event.key === 'Home') { next = tabs[0]; }
            else if (event.key === 'End') { next = tabs[tabs.length - 1]; }
            if (next) { event.preventDefault(); selectTab(next, true); }
          });
        });

        // Default view: Contact (the last directory entry, holding all accounts).
        var defaultTab = document.getElementById('tab-contact');
        tabs.forEach(function (t) { t.tabIndex = t === defaultTab ? 0 : -1; });
      })();
    
