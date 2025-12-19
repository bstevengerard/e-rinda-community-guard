import { useState, useEffect, FormEvent } from 'react';

type Report = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  status: 'PENDING' | 'INVESTIGATING' | 'RESOLVED';
  createdAt: string;
  user?: { name: string };
};

const REPORT_STATUSES = ['PENDING', 'INVESTIGATING', 'RESOLVED'];

const ReportsPage = () => {
  // Mock user - in production, this would come from authentication context
  const user = { role: 'UMUNYERONDO' }; // Can be: UMUNYERONDO, VILLAGE_COORDINATOR, CELL_COORDINATOR, SECTOR_COORDINATOR, SUPER_ADMIN

  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const isCoordinator = user?.role.includes('COORDINATOR') || user?.role === 'SUPER_ADMIN';

  // Mock data - in production, this would fetch from API
  const mockReports: Report[] = [
    {
      id: '1',
      title: 'Security Incident at Main Gate',
      description: 'Suspicious activity observed near the main entrance.',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      user: { name: 'Jean UWIMANA' },
    },
    {
      id: '2',
      title: 'Lost Item Report',
      description: 'A wallet was found in the community center.',
      status: 'RESOLVED',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      user: { name: 'Marie MUKAMANA' },
    },
  ];

  const fetchReports = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Mock API call - replace with actual fetch
      setTimeout(() => {
        setReports(mockReports);
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Mock submission - in production, this would send to API
    try {
      // Simulate API call
      setTimeout(() => {
        const newReport: Report = {
          id: Date.now().toString(),
          title,
          description,
          status: 'PENDING',
          createdAt: new Date().toISOString(),
          user: { name: 'Current User' },
        };
        setReports([newReport, ...reports]);
        setTitle('');
        setDescription('');
        setImage(null);
      }, 500);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setFormError(errorMessage);
    }
  };

  const handleStatusChange = async (reportId: string, newStatus: string) => {
    try {
      setError(null);
      // Mock status update - in production, this would call API
      setReports(reports.map(report =>
        report.id === reportId
          ? { ...report, status: newStatus as Report['status'] }
          : report
      ));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Incident Reports</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mb-8 bg-card p-6 rounded-lg border border-border">
        <h2 className="text-xl font-semibold">Submit a New Report</h2>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-foreground">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-foreground">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-foreground">Image (Optional)</label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            accept="image/*"
            className="mt-1 block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-accent-foreground hover:file:bg-accent/80"
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90"
        >
          Submit Report
        </button>
        {formError && <p className="text-destructive">{formError}</p>}
      </form>

      <h2 className="text-xl font-bold mb-4">Submitted Reports</h2>
      {error && <p className="text-destructive mb-4">Error: {error}</p>}
      {isLoading ? (
        <p>Loading reports...</p>
      ) : (
        <div className="space-y-4">
          {reports.length > 0 ? reports.map(report => (
            <div key={report.id} className="p-4 bg-card border border-border rounded-md">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-foreground">{report.title}</h3>
                  {isCoordinator && <p className="text-sm text-muted-foreground">By: {report.user?.name}</p>}
                  <p className="text-sm text-muted-foreground">On: {new Date(report.createdAt).toLocaleString()}</p>
                </div>
                {isCoordinator ? (
                  <select
                    value={report.status}
                    onChange={(e) => handleStatusChange(report.id, e.target.value)}
                    className="block rounded-md border-border bg-background px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {REPORT_STATUSES.map(status => <option key={status} value={status}>{status}</option>)}
                  </select>
                ) : (
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    report.status === 'RESOLVED'
                      ? 'bg-accent/20 text-accent'
                      : report.status === 'PENDING'
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-primary/20 text-primary'
                  }`}>
                    {report.status}
                  </span>
                )}
              </div>
              <p className="mt-2 text-foreground">{report.description}</p>
              {report.imageUrl && <img src={report.imageUrl} alt="Report image" className="mt-2 rounded-lg max-h-80" />}
            </div>
          )) : <p>No reports found.</p>}
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
