import { useState, useEffect } from 'react';
import apiClient from '../services/apiClient';
import SplitText from '../components/ui/SplitText';

const MapPage = () => {
  const [selectedType, setSelectedType] = useState<'OCEAN_DEBRIS' | 'TSUNAMI_WARNING'>('OCEAN_DEBRIS');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(`/v1/reports/heatmap?type=${selectedType}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedType]);

  return (
    <div className="pt-24 p-8 max-w-6xl mx-auto bg-dark-bg min-h-screen">
      <SplitText
        text="Crisis Map"
        className="text-4xl md:text-5xl font-bold text-royal-gold mb-8"
        delay={80}
        duration={0.6}
        tag="h1"
        textAlign="center"
      />
      
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <label className="text-foreground font-medium">Select Data Layer:</label>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedType('OCEAN_DEBRIS')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover-elevate ${
                selectedType === 'OCEAN_DEBRIS'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
              data-testid="button-pollution-hotspots"
            >
              Pollution Hotspots
            </button>
            <button
              onClick={() => setSelectedType('TSUNAMI_WARNING')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover-elevate ${
                selectedType === 'TSUNAMI_WARNING'
                  ? 'bg-destructive text-destructive-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
              data-testid="button-crisis-events"
            >
              Live Crisis Events
            </button>
          </div>
        </div>
        
        {loading && (
          <div className="text-center text-foreground text-lg">
            Loading data...
          </div>
        )}
        
        {data && !loading && (
          <div className="bg-card border border-card-border rounded-lg p-6">
            <h2 className="text-2xl font-bold text-card-foreground mb-4">
              Data for: {selectedType === 'OCEAN_DEBRIS' ? 'Pollution Hotspots' : 'Live Crisis Events'}
            </h2>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
              {data.data_points?.map((point: any) => (
                <div key={point.id} className="bg-muted/20 border border-border rounded-lg p-4">
                  <div className="text-sm text-muted-foreground mb-1">ID: {point.id}</div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Coordinates: {point.lat.toFixed(4)}, {point.lng.toFixed(4)}
                  </div>
                  <div className="text-sm text-foreground">{point.description}</div>
                  <div className="mt-2">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                      point.type === 'OCEAN_DEBRIS' 
                        ? 'bg-primary/20 text-primary' 
                        : 'bg-destructive/20 text-destructive'
                    }`}>
                      {point.type.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <details className="bg-muted/10 border border-border rounded-lg p-4">
              <summary className="cursor-pointer text-card-foreground font-semibold mb-2">
                View Raw JSON Data
              </summary>
              <pre className="bg-card border border-card-border p-4 rounded text-sm text-card-foreground overflow-x-auto">
                {JSON.stringify(data, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
      
      {/* Placeholder for future map visualization */}
      <div className="bg-card/50 border-2 border-dashed border-card-border rounded-lg p-12 text-center">
        <div className="text-4xl text-muted-foreground mb-4">🗺️</div>
        <h3 className="text-2xl font-bold text-card-foreground mb-2">Interactive Map Coming Soon</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          A full interactive map with marker clustering, heat maps, and real-time updates will be integrated here.
        </p>
      </div>
    </div>
  );
};

export default MapPage;