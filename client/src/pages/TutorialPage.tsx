import SplitText from '../components/ui/SplitText';

const TutorialPage = () => {
  return (
    <div className="pt-24 p-8 max-w-4xl mx-auto text-muted-foreground bg-dark-bg min-h-screen">
      <SplitText
        text="How to Use The Chola Citadel"
        className="text-4xl md:text-5xl font-bold text-royal-gold mb-6"
        delay={80}
        duration={0.6}
        tag="h1"
        textAlign="center"
      />
      
      <div className="space-y-8">
        <div className="p-6 bg-ocean-blue/20 rounded-lg border border-ocean-blue">
          <h2 className="text-2xl font-bold text-foreground mb-3">Step 1: Reporting an Incident</h2>
          <p className="mb-2">When you encounter an ocean hazard or a natural crisis, you can report it instantly.</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Navigate to the <strong className="text-royal-gold">'New Report'</strong> page.</li>
            <li>Fill in a brief description of the event.</li>
            <li>Attach a photo or video as evidence. The app will automatically use your phone's location.</li>
            <li>Click 'Submit Report'. Your report will be sent for verification.</li>
          </ol>
        </div>

        <div className="p-6 bg-deep-teal/20 rounded-lg border border-deep-teal">
          <h2 className="text-2xl font-bold text-foreground mb-3">Step 2: Viewing the Crisis Map</h2>
          <p className="mb-2">The map provides a live, visual representation of all verified reports.</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Go to the <strong className="text-royal-gold">'Crisis Map'</strong> page.</li>
            <li>Use the layer toggle to switch between different views:</li>
            <li className="ml-4"><strong className="text-foreground">'Pollution Hotspots'</strong> shows long-term data on ocean debris and trash accumulation.</li>
            <li className="ml-4"><strong className="text-foreground">'Live Crisis Events'</strong> displays active emergencies like tsunamis, oil spills, or extreme weather.</li>
            <li>Click on any marker to see detailed information about that specific incident.</li>
          </ol>
        </div>

        <div className="p-6 bg-primary/20 rounded-lg border border-primary">
          <h2 className="text-2xl font-bold text-foreground mb-3">Step 3: Understanding Report Status</h2>
          <p className="mb-4">All reports go through a verification process to ensure accuracy:</p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 bg-yellow-500 rounded-full"></span>
              <span><strong className="text-foreground">Pending:</strong> Your report is under review</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 bg-green-500 rounded-full"></span>
              <span><strong className="text-foreground">Verified:</strong> Report confirmed and added to public map</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 bg-red-500 rounded-full"></span>
              <span><strong className="text-foreground">Urgent:</strong> Emergency response teams have been notified</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-muted/20 rounded-lg border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-3">Safety Guidelines</h2>
          <div className="space-y-3">
            <p><strong className="text-royal-gold">⚠️ Personal Safety First:</strong> Never put yourself in danger to document an incident.</p>
            <p><strong className="text-royal-gold">📞 Emergency Situations:</strong> For life-threatening emergencies, call 108 immediately before using the app.</p>
            <p><strong className="text-royal-gold">🔒 Location Privacy:</strong> Your exact location is only shared with authorized emergency responders.</p>
            <p><strong className="text-royal-gold">📸 Evidence Guidelines:</strong> Take clear photos/videos but maintain a safe distance from hazardous areas.</p>
          </div>
        </div>

        <div className="p-6 bg-destructive/20 rounded-lg border border-destructive">
          <h2 className="text-2xl font-bold text-foreground mb-3">Types of Incidents to Report</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-bold text-foreground mb-2">🌊 Marine Hazards</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Oil spills or chemical pollution</li>
                <li>Large debris accumulations</li>
                <li>Dead marine life</li>
                <li>Unusual water discoloration</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-2">🚨 Natural Disasters</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Tsunami warning signs</li>
                <li>Severe coastal erosion</li>
                <li>Extreme weather patterns</li>
                <li>Sudden changes in sea level</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center p-8 bg-card/50 rounded-lg border border-card-border">
          <h2 className="text-2xl font-bold text-royal-gold mb-4">Ready to Make a Difference?</h2>
          <p className="text-foreground mb-6 text-lg">
            Join thousands of coastal guardians protecting our oceans, one report at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/report"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold 
                       hover-elevate transition-all duration-300"
              data-testid="button-start-reporting"
            >
              Start Reporting Now
            </a>
            <a
              href="/map"
              className="bg-ocean-blue text-white px-8 py-3 rounded-lg font-semibold 
                       hover-elevate transition-all duration-300"
              data-testid="button-explore-map"
            >
              Explore the Map
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialPage;